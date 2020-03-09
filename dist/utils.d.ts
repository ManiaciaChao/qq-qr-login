import { CookieJar } from "tough-cookie";
export declare const sleep: (ms: number) => Promise<unknown>;
export interface IParams {
    [key: string]: string | number;
}
export declare const hash33: (t: string) => number;
export declare const getCookieValue: (jar: CookieJar) => (url: string, key: string) => string;
export declare const withQuery: (url: string, params: IParams) => string;
