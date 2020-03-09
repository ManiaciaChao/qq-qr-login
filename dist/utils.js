"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = require("url");
exports.sleep = (ms) => new Promise(resolve => setTimeout(() => {
    resolve();
}, ms));
exports.hash33 = (t) => {
    for (var e = 0, i = 0, n = t.length; i < n; ++i)
        e += (e << 5) + t.charCodeAt(i);
    return 2147483647 & e;
};
exports.getCookieValue = (jar) => (url, key) => jar.getCookiesSync(url).filter(cookie => cookie.key === key)[0].value;
exports.withQuery = (url, params) => {
    const urlObj = new URL(url);
    for (const [key, val] of Object.entries(params)) {
        urlObj.searchParams.append(key, val.toString());
    }
    return url_1.format(urlObj);
};
