<p align="center">
  <img src="app/new-api/web/public/brand/itarouter-symbol.svg" alt="ItaRouter" width="88" height="88">
</p>

<h1 align="center">ItaRouter</h1>

<p align="center"><strong>さまざまな AI モデルを、一つの API で。</strong></p>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-AGPLv3-087F78" alt="License: AGPLv3"></a>
  <img src="https://img.shields.io/badge/status-development-087F78" alt="Status: development">
  <a href="https://github.com/dodamworks/itarouter/stargazers"><img src="https://img.shields.io/github/stars/dodamworks/itarouter?style=flat&amp;label=GitHub%20stars&amp;color=087F78" alt="GitHub stars"></a>
</p>

[New API](https://github.com/QuantumNous/new-api) を基盤とするオープンソースの統合 AI API ゲートウェイです。モデルプロバイダーを接続し、顧客アカウント、API キー、残高、使用履歴を一つの Web コンソールで管理します。

<p align="center">
  <a href="#get-started">ローカル実行</a> ·
  <a href="https://github.com/dodamworks/itarouter/issues">不具合を報告</a> ·
  <a href="#contributing">貢献する</a>
</p>

<details>
<summary>言語を選択 · 10 言語</summary>

[English](README.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [Français](README.fr.md) · **日本語** · [한국어](README.ko.md) · [Português (Brasil)](README.pt-BR.md) · [Русский](README.ru.md) · [Español](README.es.md) · [Tiếng Việt](README.vi.md)

</details>

[itarouter.com](https://itarouter.com)

## 現在の状態

[itarouter.com](https://itarouter.com) でウェブサイトを公開しています。新規登録にはメール認証と Cloudflare Turnstile を使用します。開発初期のバージョンで、モデルプロバイダーへの接続、実際の決済、自動モデル選択は未設定です。

## 主な機能

- **モデル接続：**プロバイダーを設定し、モデル一覧を確認して、プレイグラウンドでリクエストを試せます。
- **API アクセス管理：**既存のコンソールで顧客アカウントと API キーを管理します。
- **残高と使用履歴：**ウォレット、チャージ注文履歴、残高、使用ログを利用できます。実際の決済には決済事業者の設定が必要です。
- **多言語コンソール：**既存の New API 画面を維持し、ItaRouter のブランドと顧客向け画面を中心とした翻訳を適用しています。

<a id="get-started"></a>

## ローカルで始める

Git、Bun **1.4.4**、Go **1.26.10**（または Go ツールチェーンの自動ダウンロード）、C/C++ ビルドツール、OpenSSL が必要です。依存関係のダウンロードにはネットワーク接続が必要です。ローカル環境は SQLite を使用し、Redis、モデルプロバイダーのキー、決済アカウントは不要です。

リポジトリを取得してビルドします：

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

リポジトリのルートからサーバーを起動します：

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

**http://127.0.0.1:3017/** を開き、最初の管理者を設定します。既存のサイト設定で `SystemName` を `ItaRouter`、`Logo` を `/brand/itarouter-symbol.svg` にします。Ctrl+C で停止し、起動コマンドを再実行すると同じ DB とセッションシークレットを引き続き使用します。

サーバーはすべてのネットワークインターフェースで待ち受けます。これはローカル開発用の設定なので、インターネットには公開しないでください。ポート変更、初期設定、顧客メニューについては[ローカル実行ガイド](docs/development/LOCAL-RUN.md)を参照してください。上流の `latest` Docker イメージには ItaRouter の変更は含まれません。

## 対応言語

英語、簡体字中国語、繁体字中国語、フランス語、日本語、韓国語、ブラジルポルトガル語、ロシア語、スペイン語、ベトナム語に対応します。未翻訳の文言は英語で表示します。

既定および未翻訳時の表示言語は英語です。保存済みの言語選択がブラウザーの優先言語より優先され、ログイン後はアカウントに保存された言語が適用されます。IP による地域判定は行いません。一部の管理画面と動的な文言は英語のままです。

<a id="contributing"></a>

## 貢献するには

変更したい動作や改善点を[Issue](https://github.com/dodamworks/itarouter/issues)で説明してください。既存の画面と設定を活用し、変更を小さく保ち、関連する検証結果を添えてください。上流の告知を保持し、認証情報、DB、ログはコミットしないでください。

## ドキュメント

- [UPSTREAM.json](UPSTREAM.json)：固定した New API のリビジョンと変更ファイル。
- [CHANGES.md](CHANGES.md)：ItaRouter の変更履歴。
- [SOURCE.md](SOURCE.md)：ソースの範囲とデプロイ版に対応するソースの提供手順。
- [New API — upstream README](app/new-api/README.ja.md)

---

New API を基盤とし、[AGPLv3](LICENSE) を適用します。[上流の NOTICE](NOTICE)、[ItaRouter の告知](ITAROUTER-NOTICE.md)、[サードパーティの告知](app/new-api/THIRD-PARTY-LICENSES.md)を確認してください。

Frontend design and development by New API contributors.
