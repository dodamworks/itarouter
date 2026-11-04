<p align="center"><img src="app/new-api/web/public/brand/itarouter-symbol.svg" width="64" height="64" alt="ItaRouter"></p>

# ItaRouter

**English** · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [Français](README.fr.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Português (Brasil)](README.pt-BR.md) · [Русский](README.ru.md) · [Español](README.es.md) · [Tiếng Việt](README.vi.md)

An AI API gateway built on [New API](https://github.com/QuantumNous/new-api). Use the existing web console to manage model connections, customer accounts, API keys, credits and usage.

Domain: `itarouter.com`

## Current status

This is an early development version. ItaRouter branding, the logo and customer-focused translations are in place. Provider connections, live payments and automatic model selection are not configured.

The interface supports English, Simplified Chinese, Traditional Chinese, French, Japanese, Korean, Brazilian Portuguese, Russian, Spanish and Vietnamese. Untranslated text falls back to English.

## What is included

- Existing model catalog, playground, API key, usage, wallet, profile and security screens.
- Upstream backend and frontend, with pinned source and the original notices preserved.
- ItaRouter logo, favicon and Geist wordmark. Customer navigation uses existing administrator settings.

## Run locally

Requirements: Bun 1.4.4, Go 1.26.10 and a C/C++ build toolchain. Local verification uses SQLite.

```sh
mkdir -p .local/dev/bin
(cd app/new-api/web && bun install --frozen-lockfile && bun run build)
(cd app/new-api && GOTOOLCHAIN=auto go build -o ../../.local/dev/bin/new-api .)
```

Run from the repository root. See the [local run guide](docs/development/LOCAL-RUN.md) for startup, session secrets, initial administrator setup and branding settings. Do not use the local setup as a production deployment.

## Project files

- [UPSTREAM.json](UPSTREAM.json): pinned New API revision and modified files.
- [CHANGES.md](CHANGES.md): ItaRouter changes.
- [SOURCE.md](SOURCE.md): source scope and version-matched source distribution.

- [New API — upstream README](app/new-api/README.md)

---

Based on New API under [AGPLv3](LICENSE). Read the [upstream NOTICE](NOTICE), [ItaRouter notice](ITAROUTER-NOTICE.md) and [third-party notices](app/new-api/THIRD-PARTY-LICENSES.md).

Frontend design and development by New API contributors.
