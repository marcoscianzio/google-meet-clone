import { randomCharacters } from "./randomCharacters";

export const generateMeetId = (): string => {
  const meetId = `${randomCharacters(3)}-${randomCharacters(
    3
  )}-${randomCharacters(3)}`;

  return meetId;
};
