import { Field, ObjectType } from "type-graphql";
import { FeedBack } from "./feedback";
import { Meet } from "./meet";
import { Message } from "./message";

@ObjectType()
export class User {
  @Field()
  googleId?: string;

  @Field()
  name?: string;

  @Field()
  email?: string;

  @Field()
  pic?: string;

  @Field(() => [Meet], { nullable: true })
  hostedMeets?: Meet[] | null;

  @Field(() => [Meet], { nullable: true })
  meets?: Meet[] | null;

  @Field(() => [Message], { nullable: true })
  message?: Message[] | null;

  @Field(() => [FeedBack], { nullable: true })
  feedBack?: FeedBack[] | null;
}
