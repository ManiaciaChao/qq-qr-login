import {} from "tough-cookie";
import { fetch } from "./fetch";
import { withQuery, getCookieValue, hash33, sleep } from "./utils";
import { appid, daid, style, s_url } from "./config.json";
import { writeFileSync } from "fs";

export const prework = () =>
  fetch(
    withQuery("https://xui.ptlogin2.qq.com/cgi-bin/xlogin", {
      appid,
      daid,
      style,
      s_url
    })
  );

export const getQRCode = () =>
  fetch(
    withQuery("https://ssl.ptlogin2.qq.com/ptqrshow", {
      appid: "549000912",
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

export const queryQRCodeState = () => {
  const action = `0-0-${Date.now()}`;
  const login_sig = getCookieValue(
    "https://ssl.ptlogin2.qq.com",
    "pt_login_sig"
  );
  const ptqrtoken = hash33(
    getCookieValue("https://ssl.ptlogin2.qq.com", "qrsig")
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
    }),
    {
      method: "GET",
      headers: {
        Referer: "https://xui.ptlogin2.qq.com/"
      }
    }
  );
};