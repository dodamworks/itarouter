<p align="center">
  <img src="app/new-api/web/public/brand/itarouter-symbol.svg" alt="ItaRouter" width="88" height="88">
</p>

<h1 align="center">ItaRouter</h1>

<p align="center"><strong>多種 AI 模型，一個 API。</strong></p>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-AGPLv3-087F78" alt="License: AGPLv3"></a>
  <img src="https://img.shields.io/badge/status-development-087F78" alt="Status: development">
  <a href="https://github.com/dodamworks/itarouter/stargazers"><img src="https://img.shields.io/github/stars/dodamworks/itarouter?style=flat&amp;label=GitHub%20stars&amp;color=087F78" alt="GitHub stars"></a>
</p>

以 [New API](https://github.com/QuantumNous/new-api) 為基礎的開源整合式 AI API 閘道。在同一個網頁控制台連接模型供應商，管理客戶帳號、API 金鑰、餘額和使用紀錄。

<p align="center">
  <a href="#get-started">本機執行</a> ·
  <a href="https://github.com/dodamworks/itarouter/issues">回報問題</a> ·
  <a href="#contributing">參與貢獻</a>
</p>

<details>
<summary>選擇語言 · 10 種語言</summary>

[English](README.md) · [简体中文](README.zh-CN.md) · **繁體中文** · [Français](README.fr.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Português (Brasil)](README.pt-BR.md) · [Русский](README.ru.md) · [Español](README.es.md) · [Tiếng Việt](README.vi.md)

</details>

[itarouter.com](https://itarouter.com)

## 目前狀態

網站已於 [itarouter.com](https://itarouter.com) 公開。客戶註冊須通過電子郵件驗證及 Cloudflare Turnstile。專案仍處於早期開發階段，模型供應商連線、實際付款及自動模型選擇尚未設定。

## 功能

- **模型連線：**設定供應商連線，瀏覽模型目錄，並在遊樂場中測試請求。
- **API 存取管理：**透過既有控制台管理客戶帳號和 API 金鑰。
- **餘額與用量：**使用錢包、儲值訂單紀錄、餘額和使用日誌。實際付款需要設定付款服務。
- **多語言控制台：**沿用 New API 介面，加入 ItaRouter 品牌和以客戶介面為主的翻譯。

<a id="get-started"></a>

## 在本機開始

需要 Git、Bun **1.4.4**、Go **1.26.10**（或自動下載 Go 工具鏈）、C/C++ 建置工具和 OpenSSL。下載相依套件需要網路連線。本機環境使用 SQLite，不需要 Redis、模型供應商金鑰或付款帳號。

複製儲存庫並建置：

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

在儲存庫根目錄啟動服務：

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

開啟 **http://127.0.0.1:3017/** 完成首次管理員設定。在既有網站設定中，將 `SystemName` 設為 `ItaRouter`，將 `Logo` 設為 `/brand/itarouter-symbol.svg`。按 Ctrl+C 停止；再次執行啟動命令會保留同一資料庫和工作階段密鑰。

服務會監聽所有網路介面。這是本機開發設定，請勿直接公開至網際網路。連接埠調整、初始設定和客戶選單配置請見[本機執行指南](docs/development/LOCAL-RUN.md)。上游 `latest` Docker 映像不包含 ItaRouter 的修改。

## 語言

介面支援英語、簡體中文、繁體中文、法語、日語、韓語、巴西葡萄牙語、俄語、西班牙語和越南語。未翻譯的文字會顯示為英語。

預設和備用語言為英語。已儲存的語言選擇優先於瀏覽器偏好；登入後套用帳號儲存的語言。語言偵測不使用 IP 定位。翻譯以客戶介面為主，部分管理員和動態文字仍為英語。

<a id="contributing"></a>

## 參與貢獻

請先在[議題](https://github.com/dodamworks/itarouter/issues)中說明希望改變的行為或改善項目。重用既有介面和設定，保持修改範圍明確，並提供相關驗證結果。保留上游聲明，不要提交憑證、資料庫或日誌。

## 文件

- [UPSTREAM.json](UPSTREAM.json)：固定的 New API 版本與修改檔案。
- [CHANGES.md](CHANGES.md)：ItaRouter 變更紀錄。
- [SOURCE.md](SOURCE.md)：原始碼範圍及對應部署版本的原始碼提供流程。
- [New API — upstream README](app/new-api/README.zh_TW.md)

---

以 New API 為基礎，採用 [AGPLv3](LICENSE)。請閱讀[上游 NOTICE](NOTICE)、[ItaRouter 聲明](ITAROUTER-NOTICE.md)與[第三方聲明](app/new-api/THIRD-PARTY-LICENSES.md)。

Frontend design and development by New API contributors.
