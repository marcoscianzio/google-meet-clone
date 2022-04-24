import { Meet } from "../models/meet";
import ErrorHandledResponse from "./ErrorHandledResponse";

export const MeetHandledResponse = ErrorHandledResponse(
  Meet,
  "MeetObjectResponse",
  false
);
