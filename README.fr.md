<p align="center"><img src="app/new-api/web/public/brand/itarouter-symbol.svg" width="64" height="64" alt="ItaRouter"></p>

# ItaRouter

[English](README.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · **Français** · [日本語](README.ja.md) · [한국어](README.ko.md) · [Português (Brasil)](README.pt-BR.md) · [Русский](README.ru.md) · [Español](README.es.md) · [Tiếng Việt](README.vi.md)

Une passerelle API pour les modèles d’IA, basée sur [New API](https://github.com/QuantumNous/new-api). La console web existante permet de gérer les fournisseurs, les comptes clients, les clés API, les crédits et l’utilisation.

Domaine: `itarouter.com`

## État actuel

Le projet est en début de développement. L’identité ItaRouter, le logo et les traductions des écrans clients sont en place. Les connexions aux fournisseurs, les paiements réels et la sélection automatique des modèles ne sont pas encore configurés.

L’interface prend en charge l’anglais, le chinois simplifié et traditionnel, le français, le japonais, le coréen, le portugais brésilien, le russe, l’espagnol et le vietnamien. Les textes non traduits restent en anglais.

## Contenu du projet

- Les écrans existants : catalogue de modèles, playground, clés API, utilisation, portefeuille, profil et sécurité.
- Le backend et le frontend amont à une révision fixe, avec les mentions d’origine conservées.
- Le logo, le favicon et le mot-symbole Geist d’ItaRouter. Les menus clients utilisent les paramètres administrateur existants.

## Exécution locale

Prérequis : Bun 1.4.4, Go 1.26.10 et des outils de compilation C/C++. La vérification locale utilise SQLite.

```sh
mkdir -p .local/dev/bin
(cd app/new-api/web && bun install --frozen-lockfile && bun run build)
(cd app/new-api && GOTOOLCHAIN=auto go build -o ../../.local/dev/bin/new-api .)
```

Exécutez les commandes à la racine du dépôt. Le [guide local](docs/development/LOCAL-RUN.md) décrit le démarrage, le secret de session, le premier compte administrateur et les paramètres de marque. N’utilisez pas la configuration locale telle quelle en production.

## Fichiers du projet

- [UPSTREAM.json](UPSTREAM.json) : révision fixe de New API et fichiers modifiés.
- [CHANGES.md](CHANGES.md) : changements d’ItaRouter.
- [SOURCE.md](SOURCE.md) : périmètre des sources et distribution correspondant à chaque version déployée.

- [New API — upstream README](app/new-api/README.fr.md)

---

Basé sur New API sous [AGPLv3](LICENSE). Consultez la [NOTICE amont](NOTICE), la [notice ItaRouter](ITAROUTER-NOTICE.md) et les [mentions tierces](app/new-api/THIRD-PARTY-LICENSES.md).

Frontend design and development by New API contributors.
