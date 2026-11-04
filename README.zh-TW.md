<p align="center"><img src="app/new-api/web/public/brand/itarouter-symbol.svg" width="64" height="64" alt="ItaRouter"></p>

# ItaRouter

[English](README.md) · [简体中文](README.zh-CN.md) · **繁體中文** · [Français](README.fr.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Português (Brasil)](README.pt-BR.md) · [Русский](README.ru.md) · [Español](README.es.md) · [Tiếng Việt](README.vi.md)

以 [New API](https://github.com/QuantumNous/new-api) 為基礎的整合式 AI API 服務。透過現有網頁控制台管理模型連線、客戶帳號、API 金鑰、餘額和使用紀錄。

網域: `itarouter.com`

## 目前狀態

目前處於早期開發階段，已套用 ItaRouter 品牌、標誌和以客戶介面為主的翻譯。尚未設定模型供應商連線、實際付款或自動模型選擇。

介面支援英語、簡體中文、繁體中文、法語、日語、韓語、巴西葡萄牙語、俄語、西班牙語和越南語。未翻譯的文字會顯示為英語。

## 包含內容

- 既有模型廣場、遊樂場、API 金鑰、使用紀錄、錢包、個人資料和安全性頁面。
- 固定版本的上游後端與前端，並保留原作者聲明。
- ItaRouter 標誌、網站圖示和 Geist 字標。客戶選單透過既有管理員設定配置。

## 本機執行

需要 Bun 1.4.4、Go 1.26.10 和 C/C++ 建置工具。本機驗證使用 SQLite。

```sh
mkdir -p .local/dev/bin
(cd app/new-api/web && bun install --frozen-lockfile && bun run build)
(cd app/new-api && GOTOOLCHAIN=auto go build -o ../../.local/dev/bin/new-api .)
```

請在儲存庫根目錄執行。啟動服務、工作階段密鑰、首次管理員設定和品牌設定請參閱[本機執行指南](docs/development/LOCAL-RUN.md)。請勿將本機設定直接用於正式部署。

## 專案文件

- [UPSTREAM.json](UPSTREAM.json)：固定的 New API 版本與修改檔案。
- [CHANGES.md](CHANGES.md)：ItaRouter 變更紀錄。
- [SOURCE.md](SOURCE.md)：原始碼範圍及對應部署版本的原始碼提供流程。

- [New API — upstream README](app/new-api/README.zh_TW.md)

---

以 New API 為基礎，採用 [AGPLv3](LICENSE)。請閱讀[上游 NOTICE](NOTICE)、[ItaRouter 聲明](ITAROUTER-NOTICE.md)與[第三方聲明](app/new-api/THIRD-PARTY-LICENSES.md)。

Frontend design and development by New API contributors.
