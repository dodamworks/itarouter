<p align="center"><img src="app/new-api/web/public/brand/itarouter-symbol.svg" width="64" height="64" alt="ItaRouter"></p>

# ItaRouter

[English](README.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [Français](README.fr.md) · [日本語](README.ja.md) · **한국어** · [Português (Brasil)](README.pt-BR.md) · [Русский](README.ru.md) · [Español](README.es.md) · [Tiếng Việt](README.vi.md)

[New API](https://github.com/QuantumNous/new-api)를 기반으로 만드는 통합 AI API 서비스입니다. 기존 웹 콘솔로 모델 연결, 고객 계정, API 키, 잔액과 사용 내역을 관리합니다.

도메인: `itarouter.com`

## 현재 상태

초기 개발 버전입니다. ItaRouter 이름·로고와 고객 화면 중심 번역을 적용했습니다. 공급자 연결, 실제 결제와 Auto 모델 선택은 아직 설정하지 않았습니다.

화면은 영어·중국어 간체·중국어 번체·프랑스어·일본어·한국어·브라질 포르투갈어·러시아어·스페인어·베트남어를 지원합니다. 번역이 없는 문구는 영어로 표시합니다.

## 포함된 기능

- 기존 모델 목록·플레이그라운드·API 키·사용 내역·지갑·프로필·보안 화면.
- 버전을 고정한 원본 백엔드·프런트엔드와 원저작자 고지.
- ItaRouter 로고·파비콘·Geist 워드마크. 고객 메뉴는 기존 관리자 설정으로 구성합니다.

## 로컬 실행

Bun 1.4.4, Go 1.26.10과 C/C++ 빌드 도구가 필요합니다. 로컬 검증에는 SQLite를 사용합니다.

```sh
mkdir -p .local/dev/bin
(cd app/new-api/web && bun install --frozen-lockfile && bun run build)
(cd app/new-api && GOTOOLCHAIN=auto go build -o ../../.local/dev/bin/new-api .)
```

저장소 루트에서 실행합니다. 서버 실행, 세션 키, 최초 관리자 설정과 브랜드 적용은 [실행 안내](docs/development/LOCAL-RUN.ko.md)를 따릅니다. 로컬 설정을 운영 배포에 그대로 사용하지 마세요.

## 프로젝트 문서

- [UPSTREAM.json](UPSTREAM.json): New API 고정 버전과 수정 파일.
- [CHANGES.md](CHANGES.md): ItaRouter 변경 내역.
- [SOURCE.md](SOURCE.md): 소스 범위와 배포 버전에 맞춘 소스 제공 절차.

- [New API — upstream README](app/new-api/README.md)

---

New API를 기반으로 [AGPLv3](LICENSE)를 적용합니다. [원본 NOTICE](NOTICE), [ItaRouter 고지](ITAROUTER-NOTICE.md), [서드파티 고지](app/new-api/THIRD-PARTY-LICENSES.md)를 함께 확인하세요.

Frontend design and development by New API contributors.
