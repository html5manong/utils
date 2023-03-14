# jwutil

<h2 align="center">测试工具库</h2>

## 安装

```shell
$ npm install jwutil
```

## 示例

```javascript
import { localStorage, sessionStorage, safety } from "jwutil";

localStorage.set("test_utils", "检务工具库测试");
localStorage.get("test_utils");
```

## 项目结构

- **`docs`**: 项目主页及文档。
- **`src`**: 源代码目录。

## API

### `safety`

- `safety.httpSign(originalURL: String,params: Object, signData: null,appKey: String, appSecret: String )`

定义属性

- **originalURL**: 接口路径。
- **params**: http 请求参数。
- **signData**: 签名。
- **appKey**: app key。
- **appSecret**: app secret。

**示例**

```javascript
import { safety } from "jwutil";

safety.httpSign(config.url, config.data, null, appKey, appSecret);
```

## TODO

1. 深拷贝
2. 常用的正则表达式
3. 日期工具
4. ...
