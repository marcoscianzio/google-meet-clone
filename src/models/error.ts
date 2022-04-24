import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Error {
  @Field(() => String, { nullable: true })
  path?: string | null;

  @Field()
  message: string;
}
