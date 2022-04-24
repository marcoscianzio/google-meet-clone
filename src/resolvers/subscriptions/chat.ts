import { Message } from "../../models/message";
import { Arg, Resolver, Root, Subscription } from "type-graphql";

@Resolver()
export class ChatSubscriptions {
  @Subscription({
    topics: "FINISH_MEETING",
    filter: ({ payload, args }) => payload.meetId === args._meetId,
  })
  newChatMessage(
    @Arg("_meetId") _meetId: string,
    @Root() chatMessagePayload: Message
  ): Message {
    console.log(chatMessagePayload);

    return chatMessagePayload;
  }
}
