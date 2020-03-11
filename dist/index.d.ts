import { CookieJar } from "tough-cookie";
import nodeFetch, { Response } from "node-fetch";
export interface IConfig {
    appid: string;
    daid: string;
    style: string;
    s_url: string;
}
export declare const init: (config: IConfig, cookieJar?: CookieJar | undefined, qrCodePath?: string | undefined) => {
    fetch: typeof nodeFetch;
    jar: CookieJar;
    login: (cb?: ((err: boolean, resp?: Response | undefined) => void) | undefined) => Promise<{
        nickname: string;
        url: string;
    }>;
};
