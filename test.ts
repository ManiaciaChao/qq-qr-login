import { init } from "./index";
import assert, { equal } from "assert";
assert.equal;
const config = {
  appid: "549000912",
  daid: "5",
  style: "40",
  s_url: "http://qun.qzone.qq.com/group"
};

const { login } = init(config);

(async () => {
  await login(err => {
    equal(err, false, "pass");
    // process.exit(0);
  });
})();
