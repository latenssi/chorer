import { MD5 } from "jshashes";

export function md5(str) {
  return new MD5().hex(str);
}
