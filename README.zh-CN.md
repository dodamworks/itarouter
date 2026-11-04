<p align="center"><img src="app/new-api/web/public/brand/itarouter-symbol.svg" width="64" height="64" alt="ItaRouter"></p>

# ItaRouter

[English](README.md) · **简体中文** · [繁體中文](README.zh-TW.md) · [Français](README.fr.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Português (Brasil)](README.pt-BR.md) · [Русский](README.ru.md) · [Español](README.es.md) · [Tiếng Việt](README.vi.md)

基于 [New API](https://github.com/QuantumNous/new-api) 的统一 AI API 服务。使用现有网页控制台管理模型连接、客户账号、API 密钥、余额和使用记录。

域名: `itarouter.com`

## 当前状态

目前处于早期开发阶段，已应用 ItaRouter 品牌、标志和面向客户界面的翻译。尚未配置模型供应商连接、实际支付或自动模型选择。

界面支持英语、简体中文、繁体中文、法语、日语、韩语、巴西葡萄牙语、俄语、西班牙语和越南语。未翻译的文本显示为英语。

## 包含内容

- 现有模型广场、游乐场、API 密钥、使用记录、钱包、个人资料和安全页面。
- 固定版本的上游后端和前端，并保留原作者声明。
- ItaRouter 标志、网站图标和 Geist 字标。客户菜单通过现有管理员设置配置。

## 本地运行

需要 Bun 1.4.4、Go 1.26.10 和 C/C++ 构建工具。本地验证使用 SQLite。

```sh
mkdir -p .local/dev/bin
(cd app/new-api/web && bun install --frozen-lockfile && bun run build)
(cd app/new-api && GOTOOLCHAIN=auto go build -o ../../.local/dev/bin/new-api .)
```

在仓库根目录运行。启动服务、会话密钥、首次管理员设置和品牌设置请参阅[本地运行指南](docs/development/LOCAL-RUN.md)。不要将本地配置直接用于生产部署。

## 项目文件

- [UPSTREAM.json](UPSTREAM.json)：固定的 New API 版本及修改文件。
- [CHANGES.md](CHANGES.md)：ItaRouter 变更记录。
- [SOURCE.md](SOURCE.md)：源码范围及与部署版本对应的源码提供流程。

- [New API — upstream README](app/new-api/README.zh_CN.md)

---

基于 New API，采用 [AGPLv3](LICENSE)。请阅读[上游 NOTICE](NOTICE)、[ItaRouter 声明](ITAROUTER-NOTICE.md)及[第三方声明](app/new-api/THIRD-PARTY-LICENSES.md)。

Frontend design and development by New API contributors.
