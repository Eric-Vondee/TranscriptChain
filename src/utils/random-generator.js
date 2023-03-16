import { customAlphabet } from "nanoid";

export const generateUUID = (number) => {
  const letter = "0123456789ABCDEFGHJKMNPQRSTVWXYZabcdefghjkmnpqrstvwxyz";
  const nanoid = customAlphabet(letter, number);
  return nanoid().toString();
};
