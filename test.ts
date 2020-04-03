import { init } from "./index";
import assert, { equal } from "assert";
assert.equal;
const config = {
  appid: "549000912",
  daid: "5",
  style: "40",
  s_url: "http://qun.qzone.qq.com/group",
};

const { login } = init(config);

(async () => {
  await login({
    before: (qrCodePath) => console.log(qrCodePath),
    after: (err, resp) => {
      equal(resp?.status, 200, "failed");
      // process.exit(0);
    },
  });
  console.log("pass");
})();
