import {
  Arg,
  Ctx,
  Mutation,
  PubSub,
  PubSubEngine,
  Resolver,
} from "type-graphql";
import { Context } from "../../context";
import { Meet } from "../../models/meet";
import { MeetHandledResponse } from "../../responses/MeetHandledResponse";
import { StringHandledResponse } from "../../responses/StringHandledResponse";
import { generateMeetId } from "../../utils/generateMeetId";

@Resolver()
export class MeetMutations {
  @Mutation(() => Meet)
  async createMeet(@Ctx() { prisma, req }: Context): Promise<Meet> {
    let meet = null;
    let error = true;

    do {
      let meetId = generateMeetId();

      try {
        meet = await prisma.meet.create({
          data: {
            id: meetId,
            host: {
              connect: {
                googleId: req.session.userId,
              },
            },
          },
        });

        error = false;
      } catch (error) {
        continue;
      }
    } while (error);

    return meet!;
  }

  @Mutation(() => MeetHandledResponse)
  async joinMeet(
    @Arg("meetId") meetId: string,
    @Ctx() { prisma, req }: Context,
    @PubSub() pubSub: PubSubEngine
  ): Promise<InstanceType<typeof MeetHandledResponse>> {
    const meet = await prisma.meet.findUnique({
      where: { id: meetId },
      include: {
        participants: {
          select: {
            googleId: true,
          },
        },
      },
    });

    if (!meet) {
      return {
        errors: [
          {
            message: "Meet not found",
            path: "meetId",
          },
        ],
      };
    }

    if (!meet.isActive) {
      return {
        errors: [
          {
            message: "Meet has already finished",
            path: "meetId",
          },
        ],
      };
    }

    const user = await prisma.user.findUnique({
      where: { googleId: req.session.userId },
    });

    const { participants } = meet;

    const isHost = meet.hostId === req.session.userId;

    const isAlreadyParticipant = participants.some(
      (participant) => participant.googleId === "106744387007422278420"
    );

    if (!isAlreadyParticipant || !isHost) {
      await prisma.meet.update({
        where: { id: meetId },
        data: {
          participants: {
            connect: {
              googleId: req.session.userId,
            },
          },
        },
      });

      await pubSub.publish("JOIN_MEET", { meetId: meet.id, user });
    }

    return { success: meet };
  }

  @Mutation(() => Boolean)
  async leaveMeet(
    @Arg("meetId") meetId: string,
    @Ctx() { prisma, req }: Context,
    @PubSub() pubSub: PubSubEngine
  ): Promise<Boolean> {
    const meet = await prisma.meet.findUnique({
      where: { id: meetId },

      include: {
        participants: {
          select: {
            googleId: true,
          },
        },
      },
    });

    if (!meet) {
      return false;
    }

    if (!meet.isActive) {
      return false;
    }

    const user = await prisma.user.findUnique({
      where: { googleId: req.session.userId },
    });

    const wasParticipant =
      meet.participants.some(
        (participant) => participant.googleId === user?.googleId
      ) || meet.hostId === req.session.userId;

    if (!wasParticipant) {
      return false;
    }

    await prisma.meet.update({
      where: { id: meet.id },
      data: {
        participants: {
          disconnect: {
            googleId: req.session.userId,
          },
        },
      },
    });

    await pubSub.publish("LEAVE_MEET", { meetId: meet.id, user });

    return true;
  }

  @Mutation(() => StringHandledResponse)
  async finishMeeting(
    @Arg("meetId") meetId: string,
    @Ctx() { prisma, req }: Context,
    @PubSub() pubSub: PubSubEngine
  ): Promise<InstanceType<typeof StringHandledResponse>> {
    const meet = await prisma.meet.findUnique({
      where: { id: meetId },
      include: {
        host: {
          select: {
            googleId: true,
          },
        },
      },
    });

    if (!meet) {
      return {
        errors: [
          {
            message: "Meet not found",
          },
        ],
      };
    }

    const isHost = meet.hostId === req.session.userId;

    if (!isHost) {
      return {
        errors: [
          {
            message: "You're not the host of this meeting",
          },
        ],
      };
    }

    const isAlreadyFinished = !meet?.isActive;

    if (isAlreadyFinished) {
      return {
        errors: [
          {
            message: "This meeting has already finished",
          },
        ],
      };
    }

    await prisma.meet.update({
      where: { id: meetId },
      data: {
        isActive: false,
      },
    });

    await pubSub.publish("FINISH_MEET", meet.id);

    return { success: "Meet finished for everyone" };
  }
}
