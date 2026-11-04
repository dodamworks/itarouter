# Run locally

[한국어](LOCAL-RUN.ko.md)

Start from the repository root. Use Bun **1.4.4**, Go **1.26.10** (or `GOTOOLCHAIN=auto`), C/C++ build tools and network access to download dependencies. This setup uses SQLite and does not require Redis, provider API keys or a payment account.

## Build

```sh
ita_root="$PWD"
test -f "$ita_root/app/new-api/go.mod" || exit 1
test "$(bun --version)" = "1.4.4" || exit 1
mkdir -p "$ita_root/.local/dev/bin" "$ita_root/.local/dev/logs"
chmod 700 "$ita_root/.local/dev"
(cd app/new-api/web && bun install --frozen-lockfile && bun run build) || exit 1
(cd app/new-api && GOTOOLCHAIN=auto go build -o "$ita_root/.local/dev/bin/new-api" .) || exit 1
```

The Go binary embeds `web/dist`, so build the frontend first. The upstream VERSION file is empty at the pinned revision; builds without version injection may display v0.0.0/Unknown.

## Start and stop

Check that another application is not using port 3017. Run this block from the repository root. Keep the database and session secret across restarts.

```sh
ita_root="$PWD"
ita_runtime="$ita_root/.local/dev"
test -x "$ita_runtime/bin/new-api" || exit 1
if [ ! -f "$ita_runtime/session-secret" ]; then
  (umask 077; openssl rand -hex 32 > "$ita_runtime/session-secret") || exit 1
fi
(
  cd "$ita_runtime" || exit 1
  env -i PATH="$PATH" HOME="$HOME" TMPDIR="${TMPDIR:-/tmp}" \
    DEFAULT_LANGUAGE=en SESSION_COOKIE_SECURE=false TRUSTED_PROXIES=none \
    SESSION_SECRET="$(cat "$ita_runtime/session-secret")" \
    SQLITE_PATH="$ita_runtime/local.db" \
    "$ita_runtime/bin/new-api" --port 3017 --log-dir "$ita_runtime/logs"
)
```

Open http://127.0.0.1:3017/ and complete initial administrator setup. Stop with Ctrl+C; run the same block to restart. The upstream server listens on all network interfaces. These HTTP/cookie settings are for local development, not production deployment. Do not copy another service's `.env` into the runtime directory.

The upstream compose file uses a `latest` image; it does not reproduce this pinned source build. Workflows inside `app/new-api/.github/` do not automatically run as root repository CI.

## Branding

Use the existing administrator site settings:

| Setting | Value |
| --- | --- |
| SystemName | `ItaRouter` |
| Logo | `/brand/itarouter-symbol.svg` |

These values are stored in each environment's database. Checking out this repository does not apply them automatically. Leave ServerAddress and domain configuration for deployment setup. Preserve upstream attribution and notices.

Assets live in `app/new-api/web/public/brand/`. The favicon uses the same deep teal symbol (`#087F78`), with a 16/32/48px ICO fallback. Brand names use self-hosted Geist 600 with -0.025em letter spacing; body typography is unchanged. The font's OFL notice is in `web/src/assets/fonts/Geist-OFL.txt`.

Initial HTML title metadata includes `ItaRouter · New API`; the existing runtime SystemName setting controls the browser title after startup. Check the home, sign-in and sign-up screens, then restart to confirm settings persist.

## Interface languages

The menu starts with English. Remaining entries sort by English language name while displaying native labels:

English → 简体中文 → 繁體中文 → Français → 日本語 → 한국어 → Português (Brasil) → Русский → Español → Tiếng Việt.

On first visit, the browser's preferred languages are matched against supported languages. Saved browser selection takes precedence on later visits. Login applies a saved account language when present. Unsupported languages and untranslated messages fall back to English. No IP geolocation is used.

Translations focus on customer screens; some administrator and dynamic text remains English. Language selection does not change currency, pricing, timezone, providers or payment availability.

## Customer menu preset

[`config/customer-baseline.json`](../../config/customer-baseline.json) records values for the existing administrator UI. It is not a new settings loader and does not apply on checkout. Compare and back up existing environment settings before using the preset.

- **Site → Header navigation:** show Home, Console, Model Square and Docs; hide Rankings and About. Keep anonymous Model Square access. Docs still links to the upstream New API documentation.
- **Site → Sidebar modules:** keep Playground, dashboards, API Keys, usage/audit logs, Wallet, Profile and Security. Hide external chat shortcuts and unused Midjourney/Task logs. Administrator menus and role checks remain unchanged.
- **Content settings:** hide API information, Uptime Kuma, announcements and FAQ panels only when their content is empty. Enable each panel when content is ready; do not delete existing content.

`HeaderNavModules` and `SidebarModulesAdmin` are JSON values saved by the administrator forms. When using the existing option API, serialize each as a JSON string. The other four preset entries are display switches.

Hiding a menu does not delete a feature or replace server authorization. This preset does not change registration, authentication, security, roles, model pricing, charging or payment settings. A visible Wallet does not enable real payments. Validate email delivery and registration policy before serving customers.

## Verification

Check initial administrator setup, administrator login, customer signup/login, API key and wallet screens, customer denial from administrator APIs, then database and session persistence after restart. An administrator's initial quota is not provider credit or paid customer balance.

Local macOS arm64 verification on 2026-11-04 covered frontend/Go builds, fresh SQLite setup, administrator/customer login, customer administrator API denial (403), restart/session persistence and the customer navigation preset. It did not cover production databases, actual provider calls, email delivery or live payments. Keep runtime data, credentials, logs and session secrets out of Git.
