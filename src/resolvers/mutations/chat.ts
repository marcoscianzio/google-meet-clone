import { Context } from "../../context";
import {
  Arg,
  Ctx,
  Mutation,
  PubSub,
  PubSubEngine,
  Resolver,
} from "type-graphql";
import { Message } from "../../models/message";

@Resolver()
export class ChatMutations {
  @Mutation(() => Message, { nullable: true })
  async message(
    @Arg("meetId") meetId: string,
    @Arg("content") content: string,
    @Ctx() { prisma }: Context,
    @PubSub() pubSub: PubSubEngine
  ): Promise<Message | null> {
    const meet = await prisma.meet.findUnique({
      where: { id: meetId },
    });

    if (!meet) {
      return null;
    }

    if (!meet.isActive) {
      return null;
    }

    if (!meet.enableChat) {
      return null;
    }

    const message = await prisma.message.create({
      data: {
        user: {
          connect: {
            googleId: "106744387007422278420", // change to cookie,
          },
        },
        content,
        meet: {
          connect: {
            id: meetId,
          },
        },
      },
      include: {
        user: true,
      },
    });

    await pubSub.publish("CHAT_MESSAGE", message);

    return message;
  }
}
