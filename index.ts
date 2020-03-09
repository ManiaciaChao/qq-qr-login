import { prework, getQRCode, queryQRCodeState } from "./request";
import { writeFileSync } from "fs";
import { sleep } from "./utils";

(async () => {
  try {
    await prework();
  } catch {
    // this is because Tencent incorrectly set host to 'ui' instead of 'xui'
  }

  while (true) {
    try {
      const qrCode = await getQRCode();
      writeFileSync("qrCode.png", await qrCode.buffer());
    } catch (err) {
      console.log(err);
      continue;
    }
    while (true) {
      const state = await (await queryQRCodeState()).text();
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
})();
