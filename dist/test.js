"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const assert_1 = __importStar(require("assert"));
assert_1.default.equal;
const config = {
    appid: "549000912",
    daid: "5",
    style: "40",
    s_url: "http://qun.qzone.qq.com/group"
};
const { login } = index_1.init(config);
(async () => {
    await login(err => {
        assert_1.equal(err, false, "pass");
        process.exit(0);
    });
})();
