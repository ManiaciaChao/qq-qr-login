import { format } from "url";
import { jar } from "./fetch";

export const sleep = (ms: number) =>
  new Promise(resolve =>
    setTimeout(() => {
      resolve();
    }, ms)
  );

export interface IParams {
  [key: string]: string | number;
}
export const hash33 = (t: string) => {
  for (var e = 0, i = 0, n = t.length; i < n; ++i)
    e += (e << 5) + t.charCodeAt(i);
  return 2147483647 & e;
};

export const getCookieValue = (url: string, key: string) =>
  jar.getCookiesSync(url).filter(cookie => cookie.key === key)[0].value;

export const withQuery = (url: string, params: IParams) => {
  const urlObj = new URL(url);
  for (const [key, val] of Object.entries(params)) {
    urlObj.searchParams.append(key, val.toString());
  }
  return format(urlObj);
};