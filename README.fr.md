<p align="center">
  <img src="app/new-api/web/public/brand/itarouter-symbol.svg" alt="ItaRouter" width="88" height="88">
</p>

<h1 align="center">ItaRouter</h1>

<p align="center"><strong>Plusieurs modèles d’IA. Une seule API.</strong></p>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-AGPLv3-087F78" alt="License: AGPLv3"></a>
  <img src="https://img.shields.io/badge/status-development-087F78" alt="Status: development">
  <a href="https://github.com/dodamworks/itarouter/stargazers"><img src="https://img.shields.io/github/stars/dodamworks/itarouter?style=flat&amp;label=GitHub%20stars&amp;color=087F78" alt="GitHub stars"></a>
</p>

Une passerelle API d’IA open source basée sur [New API](https://github.com/QuantumNous/new-api). Connectez vos fournisseurs de modèles et gérez comptes clients, clés API, crédits et utilisation dans une seule console web.

<p align="center">
  <a href="#get-started">Exécuter localement</a> ·
  <a href="https://github.com/dodamworks/itarouter/issues">Signaler un bug</a> ·
  <a href="#contributing">Contribuer</a>
</p>

<details>
<summary>Lire dans votre langue · 10 langues</summary>

[English](README.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · **Français** · [日本語](README.ja.md) · [한국어](README.ko.md) · [Português (Brasil)](README.pt-BR.md) · [Русский](README.ru.md) · [Español](README.es.md) · [Tiếng Việt](README.vi.md)

</details>

[itarouter.com](https://itarouter.com)

## État actuel

Le site public est disponible sur [itarouter.com](https://itarouter.com). L’inscription utilise la vérification par e-mail et Cloudflare Turnstile. Le projet reste en développement initial : les fournisseurs de modèles, les paiements réels et la sélection automatique de modèles ne sont pas configurés.

## Fonctionnalités

- **Accès aux modèles :** configurez les fournisseurs, consultez le catalogue et testez des requêtes dans le playground.
- **Accès API :** gérez les comptes clients et les clés API dans la console existante.
- **Crédits et utilisation :** utilisez le portefeuille, les commandes de recharge, les soldes et les journaux d’utilisation. Les paiements réels nécessitent un prestataire configuré.
- **Console multilingue :** les écrans New API sont conservés, avec l’identité ItaRouter et des traductions centrées sur les clients.

<a id="get-started"></a>

## Démarrage local

Prérequis : Git, Bun **1.4.4**, Go **1.26.10** (ou téléchargement automatique de la chaîne Go), outils C/C++ et OpenSSL. Le téléchargement des dépendances nécessite un accès réseau. Cette configuration utilise SQLite ; Redis, une clé de fournisseur de modèles et un compte de paiement ne sont pas nécessaires.

Clonez le dépôt et compilez :

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

Démarrez le serveur depuis la racine du dépôt :

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

Ouvrez **http://127.0.0.1:3017/** et configurez le premier administrateur. Dans les paramètres du site existants, définissez `SystemName` sur `ItaRouter` et `Logo` sur `/brand/itarouter-symbol.svg`. Arrêtez avec Ctrl+C ; relancez le bloc de démarrage pour conserver la même base et le même secret de session.

Le serveur écoute sur toutes les interfaces réseau. Cette configuration est destinée au développement local ; ne l’exposez pas à Internet. Pour changer de port, configurer le site ou les menus clients, consultez le [guide local](docs/development/LOCAL-RUN.md). L’image Docker `latest` du projet amont ne contient pas les modifications ItaRouter.

## Langues

L’interface prend en charge l’anglais, le chinois simplifié et traditionnel, le français, le japonais, le coréen, le portugais brésilien, le russe, l’espagnol et le vietnamien. Les textes non traduits restent en anglais.

L’anglais est la langue par défaut et de secours. Le choix enregistré prime sur les préférences du navigateur ; après connexion, la langue enregistrée du compte s’applique. Aucune géolocalisation IP n’est utilisée. Certaines chaînes administrateur et dynamiques restent en anglais.

<a id="contributing"></a>

## Contribuer

Commencez par une [issue](https://github.com/dodamworks/itarouter/issues) décrivant le comportement ou l’amélioration souhaitée. Privilégiez les écrans et paramètres existants, des changements ciblés et une vérification adaptée. Conservez les mentions amont et ne soumettez ni identifiants, ni bases de données, ni journaux.

## Documentation

- [UPSTREAM.json](UPSTREAM.json) : révision fixe de New API et fichiers modifiés.
- [CHANGES.md](CHANGES.md) : changements d’ItaRouter.
- [SOURCE.md](SOURCE.md) : périmètre des sources et distribution correspondant à chaque version déployée.
- [New API — upstream README](app/new-api/README.fr.md)

---

Basé sur New API sous [AGPLv3](LICENSE). Consultez la [NOTICE amont](NOTICE), la [notice ItaRouter](ITAROUTER-NOTICE.md) et les [mentions tierces](app/new-api/THIRD-PARTY-LICENSES.md).

Frontend design and development by New API contributors.
