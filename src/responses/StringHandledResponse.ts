import ErrorHandledResponse from "./ErrorHandledResponse";

export const StringHandledResponse = ErrorHandledResponse(
  String,
  "StringObjectResponse",
  false
);
