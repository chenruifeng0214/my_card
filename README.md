# 个人电子名片 H5 项目

这是一个纯 HTML + CSS + JavaScript 的个人电子名片页面，适配手机端和微信内置浏览器。页面包含个人简介、联系方式、兴趣爱好、个人标签，并支持保存 vCard 到手机通讯录。

## 文件结构

```text
.
├── index.html
├── contact.vcf
├── README.md
└── assets
    ├── css
    │   └── style.css
    ├── js
    │   └── main.js
    └── img
        ├── avatar.png
        └── wechat-qr.png
```

## 如何替换个人信息

1. 修改 `assets/js/main.js` 顶部的 `profile` 对象，页面展示内容会自动更新。
2. 修改 `index.html` 里的 `title`、`description` 和首屏默认文案，方便搜索和未加载 JS 时展示。
3. 修改 `contact.vcf`，保持 vCard 3.0 格式，手机保存联系人会读取这里的信息。

常用字段说明：

```text
FN:姓名
ORG:公司
TITLE:职位
TEL;TYPE=CELL,VOICE:手机号
EMAIL;TYPE=INTERNET,PREF:邮箱
ADR;TYPE=WORK:;;;;城市;;中国
NOTE:备注信息，可写微信号和简介摘要
```

## 如何替换头像和微信二维码

1. 将头像图片替换为 `assets/img/avatar.png`。
2. 将微信二维码图片替换为 `assets/img/wechat-qr.png`。
3. 建议头像使用正方形 PNG/JPG，尺寸不小于 `400x400`。
4. 建议微信二维码使用清晰正方形图片，尺寸不小于 `600x600`。

当前项目里的两张图片是占位图，仅用于本地预览。正式部署前请替换为真实头像和真实微信二维码。

## 如何本地预览

方式一：直接双击打开 `index.html`。

方式二：用本地静态服务器预览，推荐这种方式测试复制微信号等浏览器能力：

```bash
python -m http.server 8080
```

然后在浏览器访问：

```text
http://localhost:8080
```

## 如何部署

### GitHub Pages

1. 新建 GitHub 仓库，例如 `my-card`。
2. 上传本项目所有文件。
3. 进入仓库 `Settings` -> `Pages`。
4. Source 选择 `Deploy from a branch`。
5. Branch 选择 `main`，目录选择 `/root`。
6. 保存后等待 GitHub Pages 生成访问地址。

### Netlify

1. 登录 Netlify。
2. 选择 `Add new site` -> `Deploy manually`。
3. 将整个项目文件夹拖入上传区域。
4. 部署完成后获得公开访问链接。

### 公司服务器

1. 将整个项目上传到公司 Web 服务器目录。
2. 确认 `index.html`、`contact.vcf`、`assets` 目录路径不变。
3. 建议启用 HTTPS，微信内置浏览器对复制等能力支持更稳定。

## 如何生成微信扫一扫二维码

1. 将项目部署到公网，获得一个 HTTPS 访问地址。
2. 使用任意二维码生成工具，把访问地址生成二维码。
3. 用微信扫一扫测试能否正常打开页面。
4. 如需印刷，建议下载高清 PNG 或 SVG 格式二维码。

## 隐私安全提醒

页面中的手机号、微信号、邮箱在公网部署后会公开可见。请不要在页面、vCard 或二维码中写入身份证号、家庭住址、银行卡号等敏感信息。

## 微信内置浏览器注意事项

1. `tel:` 可以调起拨号界面。
2. `mailto:` 是否调起邮件应用取决于手机系统和默认邮件 App。
3. 保存到通讯录通过下载 `contact.vcf` 实现，不同手机系统的确认流程可能不同。
4. 复制微信号优先使用 Clipboard API；如浏览器限制复制，页面会提示手动复制。
