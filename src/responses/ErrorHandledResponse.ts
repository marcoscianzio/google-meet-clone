import { Error } from "../models/error";
import { ClassType, Field, ObjectType } from "type-graphql";

export default function ErrorHandledResponse<Success>(
  successFieldValue: ClassType<Success> | String | Number | Boolean,
  name: string,
  isArray: boolean
) {
  @ObjectType(name, { isAbstract: true })
  abstract class ObjectResponseClass {
    @Field(() => (isArray ? [successFieldValue] : successFieldValue), {
      nullable: true,
    })
    success?: Success | Success[];

    @Field(() => [Error], { nullable: true })
    errors?: Error[];
  }
  return ObjectResponseClass;
}
