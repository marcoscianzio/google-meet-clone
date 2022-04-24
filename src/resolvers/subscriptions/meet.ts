import { User } from "../../models/user";
import {
  Arg,
  Field,
  ObjectType,
  Resolver,
  Root,
  Subscription,
} from "type-graphql";

@ObjectType()
class JoinOrLeavePayload {
  @Field(() => User)
  user: User;

  @Field()
  meetId: string;
}

@Resolver()
export class MeetSubscriptions {
  @Subscription({
    topics: "FINISH_MEET",
    filter: ({ payload, args }) => payload === args._meetId,
  })
  finishMeeting(@Arg("_meetId") _meetId: string): Boolean {
    return true;
  }

  @Subscription({
    topics: "JOIN_MEET",
    filter: ({ payload, args }) => payload.meetId === args._meetId,
  })
  joinMeet(
    @Arg("_meetId") _meetId: string,
    @Root() payload: JoinOrLeavePayload
  ): JoinOrLeavePayload {
    return payload;
  }

  @Subscription({
    topics: "LEAVE_MEET",
    filter: ({ payload, args }) => payload.meetId === args._meetId,
  })
  leaveMeet(
    @Arg("_meetId") _meetId: string,
    @Root() payload: JoinOrLeavePayload
  ): JoinOrLeavePayload {
    return payload;
  }
}
