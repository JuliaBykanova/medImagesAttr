import { assoc } from "./assoc";


export const generateRandomString = () => Math.random().toString(36).substring(2,15);

export const generateKey = <O extends object>(obj: O) =>
  assoc('key', generateRandomString())(obj);
