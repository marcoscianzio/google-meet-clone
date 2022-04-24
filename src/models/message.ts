import { Field, ObjectType } from "type-graphql";
import { Meet } from "./meet";
import { User } from "./user";

@ObjectType()
export class Message {
  @Field()
  id?: string;

  @Field(() => User)
  user?: User;

  @Field()
  userGoogleId?: string;

  @Field()
  content?: string;

  @Field(() => Meet)
  meet?: Meet;

  @Field()
  meetId?: string;

  @Field(() => String)
  createdAt?: Date;
}
