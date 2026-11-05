<p align="center">
  <img src="app/new-api/web/public/brand/itarouter-symbol.svg" alt="ItaRouter" width="88" height="88">
</p>

<h1 align="center">ItaRouter</h1>

<p align="center"><strong>多种 AI 模型，一个 API。</strong></p>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-AGPLv3-087F78" alt="License: AGPLv3"></a>
  <img src="https://img.shields.io/badge/status-development-087F78" alt="Status: development">
  <a href="https://github.com/dodamworks/itarouter/stargazers"><img src="https://img.shields.io/github/stars/dodamworks/itarouter?style=flat&amp;label=GitHub%20stars&amp;color=087F78" alt="GitHub stars"></a>
</p>

基于 [New API](https://github.com/QuantumNous/new-api) 的开源统一 AI API 网关。在一个网页控制台中连接模型供应商，管理客户账号、API 密钥、余额和使用记录。

<p align="center">
  <a href="#get-started">本地运行</a> ·
  <a href="https://github.com/dodamworks/itarouter/issues">报告问题</a> ·
  <a href="#contributing">参与贡献</a>
</p>

<details>
<summary>选择语言 · 10 种语言</summary>

[English](README.md) · **简体中文** · [繁體中文](README.zh-TW.md) · [Français](README.fr.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Português (Brasil)](README.pt-BR.md) · [Русский](README.ru.md) · [Español](README.es.md) · [Tiếng Việt](README.vi.md)

</details>

[itarouter.com](https://itarouter.com)

## 当前状态

网站已在 [itarouter.com](https://itarouter.com) 公开。客户注册使用电子邮件验证和 Cloudflare Turnstile。项目仍处于早期开发阶段，模型供应商连接、实际支付和自动模型选择尚未配置。

## 功能

- **模型接入：**配置供应商连接，浏览模型目录，并在游乐场中测试请求。
- **API 访问管理：**通过现有控制台管理客户账号和 API 密钥。
- **余额与用量：**使用钱包、充值订单记录、余额和使用日志。实际支付需要配置支付服务。
- **多语言控制台：**沿用 New API 界面，加入 ItaRouter 品牌和面向客户界面的翻译。

<a id="get-started"></a>

## 本地快速开始

需要 Git、Bun **1.4.4**、Go **1.26.10**（或自动下载 Go 工具链）、C/C++ 构建工具和 OpenSSL。下载依赖需要网络连接。本地环境使用 SQLite，无需 Redis、模型供应商密钥或支付账号。

克隆并构建：

```sh
git clone https://github.com/dodamworks/itarouter.git
cd itarouter

(
  set -eu
  mkdir -p .local/dev/bin .local/dev/logs
  chmod 700 .local/dev
  (cd app/new-api/web && bun install --frozen-lockfile && bun run build)
  (cd app/new-api && GOTOOLCHAIN=auto go build -o ../../.local/dev/bin/new-api .)
)
```

在仓库根目录启动服务：

```sh
(
  set -eu
  cd .local/dev
  if [ ! -s session-secret ]; then
    (umask 077; openssl rand -hex 32 > session-secret)
  fi
  env -i PATH="$PATH" HOME="$HOME" TMPDIR="${TMPDIR:-/tmp}" \
    DEFAULT_LANGUAGE=en SESSION_COOKIE_SECURE=false TRUSTED_PROXIES=none \
    SESSION_SECRET="$(cat session-secret)" SQLITE_PATH="$PWD/local.db" \
    ./bin/new-api --port 3017 --log-dir ./logs
)
```

打开 **http://127.0.0.1:3017/** 完成首次管理员设置。在现有站点设置中，将 `SystemName` 设为 `ItaRouter`，将 `Logo` 设为 `/brand/itarouter-symbol.svg`。按 Ctrl+C 停止；再次运行启动命令会保留同一数据库和会话密钥。

服务监听所有网络接口。这是本地开发配置，请勿直接暴露到互联网。端口调整、初始设置和客户菜单配置见[本地运行指南](docs/development/LOCAL-RUN.md)。上游 `latest` Docker 镜像不包含 ItaRouter 的修改。

## 语言

界面支持英语、简体中文、繁体中文、法语、日语、韩语、巴西葡萄牙语、俄语、西班牙语和越南语。未翻译的文本显示为英语。

默认和回退语言为英语。已保存的语言选择优先于浏览器偏好；登录后应用账号保存的语言。语言检测不使用 IP 地址定位。翻译以客户界面为主，部分管理员和动态文本仍为英语。

<a id="contributing"></a>

## 参与贡献

请先在[议题](https://github.com/dodamworks/itarouter/issues)中说明希望改变的行为或改进。复用现有界面和设置，保持修改范围清晰，并提供相关验证结果。保留上游声明，不要提交凭据、数据库或日志。

## 文档

- [UPSTREAM.json](UPSTREAM.json)：固定的 New API 版本及修改文件。
- [CHANGES.md](CHANGES.md)：ItaRouter 变更记录。
- [SOURCE.md](SOURCE.md)：源码范围及与部署版本对应的源码提供流程。
- [New API — upstream README](app/new-api/README.zh_CN.md)

---

基于 New API，采用 [AGPLv3](LICENSE)。请阅读[上游 NOTICE](NOTICE)、[ItaRouter 声明](ITAROUTER-NOTICE.md)及[第三方声明](app/new-api/THIRD-PARTY-LICENSES.md)。

Frontend design and development by New API contributors.
