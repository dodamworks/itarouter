<p align="center"><img src="app/new-api/web/public/brand/itarouter-symbol.svg" width="64" height="64" alt="ItaRouter"></p>

# ItaRouter

[English](README.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [Français](README.fr.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · **Português (Brasil)** · [Русский](README.ru.md) · [Español](README.es.md) · [Tiếng Việt](README.vi.md)

Um gateway de APIs de IA baseado no [New API](https://github.com/QuantumNous/new-api). Use o console web existente para gerenciar conexões com modelos, contas de clientes, chaves de API, créditos e uso.

Domínio: `itarouter.com`

## Estado atual

O projeto está no início do desenvolvimento. A identidade ItaRouter, o logo e as traduções das telas de clientes já estão aplicados. As conexões com provedores, os pagamentos reais e a seleção automática de modelos ainda não estão configurados.

A interface oferece inglês, chinês simplificado e tradicional, francês, japonês, coreano, português brasileiro, russo, espanhol e vietnamita. Os textos ainda não traduzidos aparecem em inglês.

## O que está incluído

- As telas existentes de catálogo de modelos, playground, chaves de API, uso, carteira, perfil e segurança.
- O backend e o frontend do projeto original em uma revisão fixa, com os avisos de autoria preservados.
- Logo, favicon e marca nominativa em Geist do ItaRouter. Os menus dos clientes usam as configurações administrativas existentes.

## Executar localmente

Requisitos: Bun 1.4.4, Go 1.26.10 e ferramentas de compilação C/C++. A verificação local usa SQLite.

```sh
mkdir -p .local/dev/bin
(cd app/new-api/web && bun install --frozen-lockfile && bun run build)
(cd app/new-api && GOTOOLCHAIN=auto go build -o ../../.local/dev/bin/new-api .)
```

Execute os comandos na raiz do repositório. Consulte o [guia local](docs/development/LOCAL-RUN.md) para iniciar o servidor e configurar o segredo de sessão, o primeiro administrador e a marca. Não use a configuração local diretamente em produção.

## Arquivos do projeto

- [UPSTREAM.json](UPSTREAM.json): revisão fixa do New API e arquivos modificados.
- [CHANGES.md](CHANGES.md): alterações do ItaRouter.
- [SOURCE.md](SOURCE.md): escopo do código-fonte e distribuição correspondente a cada versão implantada.

- [New API — upstream README](app/new-api/README.md)

---

Baseado no New API sob a [AGPLv3](LICENSE). Leia a [NOTICE original](NOTICE), o [aviso do ItaRouter](ITAROUTER-NOTICE.md) e os [avisos de terceiros](app/new-api/THIRD-PARTY-LICENSES.md).

Frontend design and development by New API contributors.
