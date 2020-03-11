<h1 align="center">Welcome to qq-qr-login 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> QR login for QQ web pages. QQ网页扫码登录。

## Install

```sh
yarn add qq-qr-login 
```

## Usage

example:

```typescript
import { init } from "qq-qr-login";

/**
 * this config is for *.qzone.qq.com
 */
const site = {
  appid: "549000912",
  daid: "5",
  style: "40",
  s_url: "http://qun.qzone.qq.com/group"
};

(async()=>{
  const { login, fetch, jar } = init(site);
  // do something cool
})()
```

## API

### init


```typescript
init(config: IConfig, cookieJar?: CookieJar, qrCodePath?: string): { fetch: fetch; jar: CookieJar; login: login }
```
#### Parameters

* **config**: `IConfig`
* *Optional* **cookieJar**: `CookieJar`
* *Optional* **qrCodePath**: `string`

#### Returns

* **fetch**: fetch
* **jar**: CookieJar
* **login**: login


## Author

👤 **maniacata**

* Website: http://blog.plus1sec.cn
* Github: [@ManiaciaChao](https://github.com/ManiaciaChao)

## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_