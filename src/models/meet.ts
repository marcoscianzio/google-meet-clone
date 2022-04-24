import { Field, ObjectType } from "type-graphql";
import { FeedBack } from "./feedback";
import { Message } from "./message";
import { User } from "./user";

@ObjectType()
export class Meet {
  @Field()
  id?: string;

  @Field()
  enableScreenSharing?: boolean;

  @Field()
  enableChat?: boolean;

  @Field()
  enableMicrophone?: boolean;

  @Field()
  enableVideo?: boolean;

  @Field()
  organizerAdministration?: boolean;

  @Field()
  isActive?: boolean;

  @Field(() => String)
  createdAt?: Date;

  @Field(() => Number, { nullable: true })
  duration?: number | null;

  @Field()
  hostId?: string;

  @Field(() => User, { nullable: true })
  host?: User;

  @Field(() => [User], { nullable: true })
  participants?: User[] | null;

  @Field(() => [Message], { nullable: true })
  chat?: Message[] | null;

  @Field(() => [FeedBack], { nullable: true })
  feedBack?: FeedBack[] | null;
}
