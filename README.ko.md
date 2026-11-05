<p align="center">
  <img src="app/new-api/web/public/brand/itarouter-symbol.svg" alt="ItaRouter" width="88" height="88">
</p>

<h1 align="center">ItaRouter</h1>

<p align="center"><strong>여러 AI 모델을 하나의 API로.</strong></p>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-AGPLv3-087F78" alt="License: AGPLv3"></a>
  <img src="https://img.shields.io/badge/status-development-087F78" alt="Status: development">
  <a href="https://github.com/dodamworks/itarouter/stargazers"><img src="https://img.shields.io/github/stars/dodamworks/itarouter?style=flat&amp;label=GitHub%20stars&amp;color=087F78" alt="GitHub stars"></a>
</p>

[New API](https://github.com/QuantumNous/new-api)를 기반으로 만드는 오픈소스 통합 AI API 게이트웨이입니다. 여러 모델 공급자를 연결하고 고객 계정, API 키, 잔액과 사용 내역을 하나의 웹 콘솔에서 관리합니다.

<p align="center">
  <a href="#get-started">로컬 실행</a> ·
  <a href="https://github.com/dodamworks/itarouter/issues">버그 제보</a> ·
  <a href="#contributing">기여하기</a>
</p>

<details>
<summary>언어 선택 · 10개 언어</summary>

[English](README.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [Français](README.fr.md) · [日本語](README.ja.md) · **한국어** · [Português (Brasil)](README.pt-BR.md) · [Русский](README.ru.md) · [Español](README.es.md) · [Tiếng Việt](README.vi.md)

</details>

[itarouter.com](https://itarouter.com)

## 현재 상태

[itarouter.com](https://itarouter.com)에 웹사이트를 공개했으며 이메일 인증과 Cloudflare Turnstile을 거쳐 회원가입할 수 있습니다. 초기 개발 버전으로, 모델 공급자 연결·실제 결제·Auto 모델 선택은 아직 설정하지 않았습니다.

## 제공하는 기능

- **모델 연결:** 공급자 연결을 설정하고, 모델 목록과 플레이그라운드에서 요청을 확인합니다.
- **API 접근 관리:** 기존 콘솔에서 고객 계정과 API 키를 관리합니다.
- **잔액과 사용 내역:** 지갑, 충전 주문 기록, 잔액과 사용 로그를 활용합니다. 실제 결제에는 결제 공급자 연결이 필요합니다.
- **다국어 콘솔:** New API의 기존 화면에 ItaRouter 브랜드와 고객 화면 중심 번역을 적용했습니다.

<a id="get-started"></a>

## 로컬에서 시작하기

Git, Bun **1.4.4**, Go **1.26.10** 또는 Go 도구 체인 자동 다운로드, C/C++ 빌드 도구와 OpenSSL이 필요합니다. 의존성을 받으려면 네트워크 연결이 필요합니다. 로컬 환경은 SQLite를 사용하며 Redis, 모델 공급자 키, 결제 계정은 필요하지 않습니다.

저장소를 받고 빌드합니다:

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

저장소 루트에서 서버를 시작합니다:

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

**http://127.0.0.1:3017/** 에서 최초 관리자 설정을 완료합니다. 기존 사이트 설정의 `SystemName`은 `ItaRouter`, `Logo`는 `/brand/itarouter-symbol.svg`로 지정합니다. Ctrl+C로 종료하고 시작 명령을 다시 실행하면 같은 DB와 세션 키를 유지합니다.

서버는 모든 네트워크 인터페이스에서 수신합니다. 로컬 개발용 설정이므로 인터넷에 노출하지 마세요. 포트 변경, 초기 설정과 고객 메뉴 구성은 [로컬 실행 안내](docs/development/LOCAL-RUN.ko.md)를 참고하세요. 원본 `latest` Docker 이미지에는 ItaRouter 수정 사항이 포함되지 않습니다.

## 지원 언어

화면은 영어·중국어 간체·중국어 번체·프랑스어·일본어·한국어·브라질 포르투갈어·러시아어·스페인어·베트남어를 지원합니다. 번역이 없는 문구는 영어로 표시합니다.

기본 언어와 미번역 문구는 영어입니다. 저장한 언어 선택이 브라우저 선호 언어보다 우선하고, 로그인하면 계정에 저장한 언어를 적용합니다. IP 지역으로 언어를 바꾸지는 않습니다. 번역은 고객 화면 중심이며 일부 관리자·동적 문구는 영어로 표시됩니다.

<a id="contributing"></a>

## 기여하기

[이슈](https://github.com/dodamworks/itarouter/issues)에 바꾸려는 동작이나 개선점을 먼저 설명해 주세요. 기존 화면과 설정을 활용하고 변경 범위를 작게 유지하며 관련 검증 결과를 남겨 주세요. 원본 고지는 보존하고 자격증명, DB와 로그는 변경에 포함하지 마세요.

## 문서

- [UPSTREAM.json](UPSTREAM.json): New API 고정 버전과 수정 파일.
- [CHANGES.md](CHANGES.md): ItaRouter 변경 내역.
- [SOURCE.md](SOURCE.md): 소스 범위와 배포 버전에 맞춘 소스 제공 절차.
- [New API — upstream README](app/new-api/README.md)

---

New API를 기반으로 [AGPLv3](LICENSE)를 적용합니다. [원본 NOTICE](NOTICE), [ItaRouter 고지](ITAROUTER-NOTICE.md), [서드파티 고지](app/new-api/THIRD-PARTY-LICENSES.md)를 함께 확인하세요.

Frontend design and development by New API contributors.
