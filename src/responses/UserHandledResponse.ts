import { User } from "../models/user";
import ErrorHandledResponse from "./ErrorHandledResponse";

export const UserHandledResponse = ErrorHandledResponse(
  User,
  "UserHandledResponse",
  true
);
