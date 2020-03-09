"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const config = {
    appid: "549000912",
    daid: "5",
    style: "40",
    s_url: "http://qun.qzone.qq.com/group"
};
const { login } = index_1.init(config);
(async () => {
    await login(err => {
        if (!err) {
            console.log("pass");
            process.exit(0);
        }
    });
})();
