<p align="center"><img src="app/new-api/web/public/brand/itarouter-symbol.svg" width="64" height="64" alt="ItaRouter"></p>

# ItaRouter

[English](README.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [Français](README.fr.md) · **日本語** · [한국어](README.ko.md) · [Português (Brasil)](README.pt-BR.md) · [Русский](README.ru.md) · [Español](README.es.md) · [Tiếng Việt](README.vi.md)

[New API](https://github.com/QuantumNous/new-api) を基盤とする統合 AI API サービスです。既存の Web コンソールでモデル接続、顧客アカウント、API キー、残高、使用履歴を管理します。

ドメイン: `itarouter.com`

## 現在の状態

初期開発段階です。ItaRouter の名称・ロゴと、顧客向け画面を中心とした翻訳を適用しています。プロバイダー接続、実際の決済、自動モデル選択はまだ設定していません。

英語、簡体字中国語、繁体字中国語、フランス語、日本語、韓国語、ブラジルポルトガル語、ロシア語、スペイン語、ベトナム語に対応します。未翻訳の文言は英語で表示します。

## 含まれる機能

- 既存のモデル一覧、プレイグラウンド、API キー、使用履歴、ウォレット、プロフィール、セキュリティ画面。
- バージョンを固定した上流のバックエンドとフロントエンド。原著作者の告知を保持しています。
- ItaRouter のロゴ、ファビコン、Geist のワードマーク。顧客メニューは既存の管理者設定で構成します。

## ローカル実行

Bun 1.4.4、Go 1.26.10、C/C++ ビルドツールが必要です。ローカル検証には SQLite を使用します。

```sh
mkdir -p .local/dev/bin
(cd app/new-api/web && bun install --frozen-lockfile && bun run build)
(cd app/new-api && GOTOOLCHAIN=auto go build -o ../../.local/dev/bin/new-api .)
```

リポジトリのルートから実行します。起動方法、セッションシークレット、初回の管理者設定、ブランド設定は[ローカル実行ガイド](docs/development/LOCAL-RUN.md)を参照してください。ローカル設定をそのまま本番環境に使用しないでください。

## プロジェクトの文書

- [UPSTREAM.json](UPSTREAM.json)：固定した New API のリビジョンと変更ファイル。
- [CHANGES.md](CHANGES.md)：ItaRouter の変更履歴。
- [SOURCE.md](SOURCE.md)：ソースの範囲とデプロイ版に対応するソースの提供手順。

- [New API — upstream README](app/new-api/README.ja.md)

---

New API を基盤とし、[AGPLv3](LICENSE) を適用します。[上流の NOTICE](NOTICE)、[ItaRouter の告知](ITAROUTER-NOTICE.md)、[サードパーティの告知](app/new-api/THIRD-PARTY-LICENSES.md)を確認してください。

Frontend design and development by New API contributors.
