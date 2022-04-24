import { Context } from "../../context";
import { Arg, Ctx, Query, Resolver } from "type-graphql";
import { User } from "../../models/user";
import { UserHandledResponse } from "../../responses/UserHandledResponse";

@Resolver()
export class MeetQueries {
  @Query(() => UserHandledResponse)
  async meetParticipants(
    @Arg("meetId") meetId: string,
    @Ctx() { prisma }: Context
  ): Promise<InstanceType<typeof UserHandledResponse>> {
    const meet = await prisma.meet.findUnique({
      where: {
        id: meetId,
      },
      select: {
        participants: true,
        host: true,
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

    const mergedParticipants = [meet.host, meet.participants].flat() as User[];

    return { success: mergedParticipants };
  }
}
