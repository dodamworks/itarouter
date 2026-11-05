<p align="center">
  <img src="app/new-api/web/public/brand/itarouter-symbol.svg" alt="ItaRouter" width="88" height="88">
</p>

<h1 align="center">ItaRouter</h1>

<p align="center"><strong>Muitos modelos de IA. Uma única API.</strong></p>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-AGPLv3-087F78" alt="License: AGPLv3"></a>
  <img src="https://img.shields.io/badge/status-development-087F78" alt="Status: development">
  <a href="https://github.com/dodamworks/itarouter/stargazers"><img src="https://img.shields.io/github/stars/dodamworks/itarouter?style=flat&amp;label=GitHub%20stars&amp;color=087F78" alt="GitHub stars"></a>
</p>

Um gateway de APIs de IA de código aberto baseado no [New API](https://github.com/QuantumNous/new-api). Conecte provedores de modelos e gerencie contas de clientes, chaves de API, créditos e uso em um único console web.

<p align="center">
  <a href="#get-started">Executar localmente</a> ·
  <a href="https://github.com/dodamworks/itarouter/issues">Relatar um problema</a> ·
  <a href="#contributing">Contribuir</a>
</p>

<details>
<summary>Leia no seu idioma · 10 idiomas</summary>

[English](README.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [Français](README.fr.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · **Português (Brasil)** · [Русский](README.ru.md) · [Español](README.es.md) · [Tiếng Việt](README.vi.md)

</details>

[itarouter.com](https://itarouter.com)

## Estado atual

O site público está disponível em [itarouter.com](https://itarouter.com). O cadastro usa verificação por e-mail e Cloudflare Turnstile. O projeto está em desenvolvimento inicial: provedores de modelos, pagamentos reais e seleção automática de modelos ainda não estão configurados.

## Funcionalidades

- **Acesso a modelos:** configure provedores, consulte o catálogo e teste solicitações no playground.
- **Acesso à API:** gerencie contas de clientes e chaves de API no console existente.
- **Créditos e uso:** utilize a carteira, os registros de pedidos de recarga, os saldos e os logs de uso. Pagamentos reais exigem um provedor de pagamento configurado.
- **Console multilíngue:** as telas do New API são mantidas, com a identidade ItaRouter e traduções voltadas aos clientes.

<a id="get-started"></a>

## Começar localmente

Requisitos: Git, Bun **1.4.4**, Go **1.26.10** (ou download automático da cadeia Go), ferramentas C/C++ e OpenSSL. É necessário acesso à rede para baixar dependências. Esta configuração usa SQLite; não exige Redis, chave de provedor de modelos nem conta de pagamento.

Clone o repositório e compile:

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

Inicie o servidor a partir da raiz do repositório:

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

Abra **http://127.0.0.1:3017/** e configure o primeiro administrador. Nas configurações existentes do site, defina `SystemName` como `ItaRouter` e `Logo` como `/brand/itarouter-symbol.svg`. Pare com Ctrl+C; execute novamente o bloco de inicialização para manter a mesma base e o mesmo segredo de sessão.

O servidor escuta em todas as interfaces de rede. Esta configuração é para desenvolvimento local; não a exponha à internet. Para mudar a porta, configurar o site e os menus dos clientes, consulte o [guia local](docs/development/LOCAL-RUN.md). A imagem Docker `latest` do projeto original não contém as alterações do ItaRouter.

## Idiomas

A interface oferece inglês, chinês simplificado e tradicional, francês, japonês, coreano, português brasileiro, russo, espanhol e vietnamita. Os textos ainda não traduzidos aparecem em inglês.

O inglês é o idioma padrão e de fallback. A escolha salva tem prioridade sobre as preferências do navegador; após o login, vale o idioma salvo na conta. Não há geolocalização por IP. Alguns textos administrativos e dinâmicos permanecem em inglês.

<a id="contributing"></a>

## Contribuir

Comece com uma [issue](https://github.com/dodamworks/itarouter/issues) descrevendo o comportamento ou a melhoria desejada. Reutilize as telas e configurações existentes, mantenha as alterações focadas e inclua a verificação pertinente. Preserve os avisos originais e não envie credenciais, bases de dados ou logs.

## Documentação

- [UPSTREAM.json](UPSTREAM.json): revisão fixa do New API e arquivos modificados.
- [CHANGES.md](CHANGES.md): alterações do ItaRouter.
- [SOURCE.md](SOURCE.md): escopo do código-fonte e distribuição correspondente a cada versão implantada.
- [New API — upstream README](app/new-api/README.md)

---

Baseado no New API sob a [AGPLv3](LICENSE). Leia a [NOTICE original](NOTICE), o [aviso do ItaRouter](ITAROUTER-NOTICE.md) e os [avisos de terceiros](app/new-api/THIRD-PARTY-LICENSES.md).

Frontend design and development by New API contributors.
