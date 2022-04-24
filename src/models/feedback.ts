import { Field, ObjectType } from "type-graphql";
import { Meet } from "./meet";
import { User } from "./user";

@ObjectType()
export class FeedBack {
  @Field()
  id: String;

  @Field(() => User)
  user: User;

  @Field()
  userGoogleId: String;

  @Field(() => Meet)
  meet: Meet;

  @Field()
  meetId: String;

  @Field()
  stars: number;

  @Field(() => String)
  createdAt: Date;
}
