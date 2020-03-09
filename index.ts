import {join} from "path"
import { writeFileSync } from "fs";
import { CookieJar } from "tough-cookie";
import nodeFetch, { Response } from "node-fetch";
import { withQuery, getCookieValue, hash33, IParams, sleep } from "./utils";

export interface IConfig {
  appid: string;
  daid: string;
  style: string;
  s_url: string;
}

export const init = (
  config: IConfig,
  cookieJar?: CookieJar,
  qrCodePath?: string
) => {
  const { appid, daid, style, s_url } = config;
  const jar = cookieJar || new CookieJar();
  const fetch = require("fetch-cookie")(nodeFetch, jar) as typeof nodeFetch;

  const prework = () =>
    fetch(
      withQuery("https://xui.ptlogin2.qq.com/cgi-bin/xlogin", {
        appid,
        daid,
        style,
        s_url
      })
    );

  const getQRCode = () =>
    fetch(
      withQuery("https://ssl.ptlogin2.qq.com/ptqrshow", {
        appid,
        e: "2",
        l: "M",
        s: "3",
        d: "72",
        v: "4",
        t: Math.random(),
        daid: "5",
        pt_3rd_aid: "0"
      })
    );

  const queryQRCodeState = () => {
    const action = `0-0-${Date.now()}`;
    const login_sig = getCookieValue(jar)(
      "https://ssl.ptlogin2.qq.com",
      "pt_login_sig"
    );
    const ptqrtoken = hash33(
      getCookieValue(jar)("https://ssl.ptlogin2.qq.com", "qrsig")
    );
    return fetch(
      withQuery("https://ssl.ptlogin2.qq.com/ptqrlogin", {
        u1: s_url,
        ptqrtoken,
        ptredirect: "0",
        h: "1",
        t: "1",
        g: "1",
        from_ui: "1",
        ptlang: "2052",
        action,
        js_ver: "20021917",
        js_type: "1",
        login_sig,
        pt_uistyle: "40",
        aid: appid,
        daid
      })
    );
  };

  const login = async (cb?: (err: boolean, resp?: Response) => void) => {
    try {
      await prework();
    } catch {
      // this is because Tencent incorrectly set host to 'ui' instead of 'xui'
    }

    while (true) {
      try {
        const qrCode = await getQRCode();
        const path = join(qrCodePath ? qrCodePath : __dirname,"/qrCode.png");
        writeFileSync(path, await qrCode.buffer());
        console.log(`请扫描二维码: ${path}`);
      } catch (err) {
        console.log(err);
        continue;
      }
      while (true) {
        const resp = await queryQRCodeState();
        if (resp.status === 200) {
          cb && cb(false, resp);
        } else {
          cb && cb(true);
        }
        const state = await resp.text();
        if (state.includes("未失效")) {
          await sleep(1000);
        } else if (state.includes("已失效")) {
          break;
        } else if (state.includes("登录成功")) {
          console.log(state.split(",")[2]);
          return;
        }
      }
    }
  };

  return {
    fetch,
    jar,
    login,
  };
};
