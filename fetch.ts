import nodeFetch, { Response, RequestInit } from "node-fetch";
import { CookieJar } from "tough-cookie";
import { parse } from "url";

export const jar = new CookieJar();
export const fetchCookie = require("fetch-cookie/node-fetch")(nodeFetch, jar);

export const fetch = (url: string, init?: RequestInit): Promise<Response> => {
  const { host } = parse(url);
  let originHeaders = {};
  if (init && init.headers) {
    originHeaders = init.headers;
  }
  return fetchCookie(url, {
    headers: {
      ...originHeaders,
      Cookie: jar.getCookieStringSync(host as string)
    }
  });
};
