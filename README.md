<p align="center">
  <img src="app/new-api/web/public/brand/itarouter-symbol.svg" alt="ItaRouter" width="88" height="88">
</p>

<h1 align="center">ItaRouter</h1>

<p align="center"><strong>Many AI models. One API.</strong></p>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-AGPLv3-087F78" alt="License: AGPLv3"></a>
  <img src="https://img.shields.io/badge/status-development-087F78" alt="Status: development">
  <a href="https://github.com/dodamworks/itarouter/stargazers"><img src="https://img.shields.io/github/stars/dodamworks/itarouter?style=flat&amp;label=GitHub%20stars&amp;color=087F78" alt="GitHub stars"></a>
</p>

An open-source AI API gateway built on [New API](https://github.com/QuantumNous/new-api). Connect model providers and manage customer accounts, API keys, credits and usage from one web console.

<p align="center">
  <a href="#get-started">Run locally</a> ·
  <a href="https://github.com/dodamworks/itarouter/issues">Report a bug</a> ·
  <a href="#contributing">Contribute</a>
</p>

<details>
<summary>Read in your language · 10 languages</summary>

**English** · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [Français](README.fr.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Português (Brasil)](README.pt-BR.md) · [Русский](README.ru.md) · [Español](README.es.md) · [Tiếng Việt](README.vi.md)

</details>

[itarouter.com](https://itarouter.com)

## Current status

The public website is available at [itarouter.com](https://itarouter.com). Customer signup uses email verification and Cloudflare Turnstile. This is an early development version; model-provider connections, live payments and automatic model selection are not configured.

## What you can build with it

- **Model access:** configure provider connections, browse the model catalog and try requests in the playground.
- **API access:** manage customer accounts and API keys from the existing console.
- **Credits and usage:** use the wallet, top-up order records, balances and usage logs. Live payments require a configured payment provider.
- **A multilingual console:** use the existing New API screens with ItaRouter branding and customer-focused translations.

<a id="get-started"></a>

## Get started locally

You need Git, Bun **1.4.4**, Go **1.26.10** (or automatic Go toolchain downloads), C/C++ build tools and OpenSSL. Dependency downloads require network access. This local setup uses SQLite; no Redis, model provider key or payment account is needed.

Clone and build:

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

Start the server from the repository root:

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

Open **http://127.0.0.1:3017/** and complete the initial administrator setup. In the existing site settings, set `SystemName` to `ItaRouter` and `Logo` to `/brand/itarouter-symbol.svg`. Stop with Ctrl+C; rerun the startup block to keep the same database and session secret.

The server listens on all network interfaces. Use this setup for local development; do not expose it to the internet. For port changes, setup details and the customer navigation preset, see the [local run guide](docs/development/LOCAL-RUN.md). The upstream `latest` Docker image does not contain ItaRouter modifications.

## Languages

The interface supports English, Simplified Chinese, Traditional Chinese, French, Japanese, Korean, Brazilian Portuguese, Russian, Spanish and Vietnamese. Untranslated text falls back to English.

English is the default and fallback. A saved language choice takes precedence over browser preferences; a saved account language applies after login. Language detection does not use IP location. Translations focus on customer screens; some administrator and dynamic text remains English.

<a id="contributing"></a>

## Contributing

Start with an [issue](https://github.com/dodamworks/itarouter/issues) describing the behavior or improvement. Keep changes focused, reuse existing screens and settings, and include relevant verification. Preserve upstream notices and keep credentials, databases and logs out of changes.

## Documentation

- [UPSTREAM.json](UPSTREAM.json): pinned New API revision and modified files.
- [CHANGES.md](CHANGES.md): ItaRouter changes.
- [SOURCE.md](SOURCE.md): source scope and version-matched source distribution.
- [New API — upstream README](app/new-api/README.md)

---

Based on New API under [AGPLv3](LICENSE). Read the [upstream NOTICE](NOTICE), [ItaRouter notice](ITAROUTER-NOTICE.md) and [third-party notices](app/new-api/THIRD-PARTY-LICENSES.md).

Frontend design and development by New API contributors.
