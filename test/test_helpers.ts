import path from "path";
import { URL } from "url";

export const directory = (importMetaUrl: string) => {
  const fileUrl = new URL(importMetaUrl);
  return path.resolve(fileUrl.host + path.sep + fileUrl.pathname, "..");
};

export const assertEquals = (actual: any, expected: any) => {
  if (actual !== expected) {
    throw new Error(
      `actual does not equal expected\n\nactual:\n${actual}\n\nexpected:\n${expected}`
    );
  }
};
