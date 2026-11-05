# 로컬 실행

제품 루트에서 실행합니다. Bun 1.4.4, Go 1.26.10 또는 GOTOOLCHAIN=auto, C/C++ 빌드 도구, 의존성 다운로드용 네트워크가 필요합니다. SQLite를 사용하며 Redis·공급자 키·결제 연결은 필요하지 않습니다.

## 빌드

```sh
ita_root="$PWD"
test -f "$ita_root/app/new-api/go.mod" || exit 1
test "$(bun --version)" = "1.4.4" || exit 1
mkdir -p "$ita_root/.local/dev/bin" "$ita_root/.local/dev/logs"
chmod 700 "$ita_root/.local/dev"
(cd app/new-api/web && bun install --frozen-lockfile && bun run build) || exit 1
(cd app/new-api && GOTOOLCHAIN=auto go build -o "$ita_root/.local/dev/bin/new-api" .) || exit 1
```

## 실행·종료

3017 포트를 다른 앱이 쓰고 있으면 중단하고 포트 사용 대상을 먼저 확인합니다. 아래 블록도 제품 루트에서 실행합니다. 세션 키와 DB는 재시작 때 유지합니다.

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

http://127.0.0.1:3017/ 에 접속해 초기 관리자 설정을 진행합니다. Ctrl+C로 종료한 뒤 같은 실행 블록으로 재시작합니다. 원본 서버는 모든 네트워크 인터페이스에 listen하므로 이 절차를 공용 배포로 사용하지 않습니다. 런타임 폴더에 다른 서비스의 .env를 복사하지 않습니다.

## 확인할 항목

초기 관리자 생성 → 관리자 로그인 → 일반 고객 가입/로그인 → 고객 키·지갑 화면 → 고객 관리자 기능 접근 차단 → 재시작 후 DB/로그인/세션 유지 순서로 확인합니다. 관리자 초기 할당량은 실제 결제금이나 공급자 크레딧이 아닙니다.

고정 원본은 VERSION이 비어 있어 v0.0.0/Unknown으로 표시될 수 있습니다. 원본 compose는 latest 이미지를 사용하므로 위 고정 소스 빌드와 혼용하지 않습니다. 중첩된 app/new-api/.github의 워크플로는 루트 CI로 자동 실행되지 않습니다.

2026-11-04 macOS arm64에서 Bun 1.4.4/Go 1.26.10 빌드와 HTTP 클라이언트를 통한 새 DB 초기화·가입/로그인·고객 관리자 API 403·서버 재시작 후 접근 토큰/갱신 쿠키 유지·HTML 응답을 확인했습니다. 다른 기기/브라우저 재검증·실제 모델/결제/메일·운영 DB 검증은 미실시입니다.

## 로컬 서비스명 설정

초기 관리자 계정으로 로그인한 뒤 시스템 설정의 일반/시스템 정보에서 서비스명(SystemName)을 **ItaRouter**로 저장합니다. 기존 New API 설정 기능을 사용하며, 앱 소스의 기본 브랜드 문자열을 일괄 치환하지 않습니다.

Logo는 아래 로고 안내에 따라 설정합니다. ServerAddress, Footer, About 및 실제 도메인 연결은 이 단계에서 변경하지 않습니다. 원본 출처와 라이선스 고지도 유지합니다.

서비스명은 실행 환경의 DB에 저장됩니다. 저장소 checkout이나 브랜치 전환으로 자동 적용되거나 되돌아가지 않으므로 새 환경에서는 같은 설정을 다시 저장해야 합니다. DB·관리자 인증 정보는 Git에 포함하지 않습니다.

설정 후 홈·가입·로그인 화면과 브라우저 제목을 확인하고 서버를 재시작해 이름이 유지되는지 확인합니다. JavaScript 실행 전 초기 HTML의 title과 title 메타는 ItaRouter · New API로 출처를 함께 표시하고, 실행 후 브라우저 제목은 기존 SystemName 설정을 따릅니다.

## 화면 언어

메뉴 순서: English → 简体中文 → 繁體中文 → Français → 日本語 → 한국어 → Português (Brasil) → Русский → Español → Tiếng Việt. 기본 언어인 영어를 맨 앞에 두고, 나머지는 영문 언어명 기준 알파벳순으로 정렬합니다. 화면에는 각 언어의 원어 이름을 표시합니다. 메뉴 순서 변경은 자동 감지·저장·fallback 동작에 영향을 주지 않습니다.

영어가 기준 및 fallback 언어입니다. 첫 방문은 브라우저 선호 언어를 감지하고, 이후에는 브라우저에 저장한 선택이 우선합니다. IP나 접속 국가를 조회하지 않습니다. 상단 언어 메뉴에서 한국어, Español 또는 Português (Brasil)을 선택할 수 있습니다. 비로그인 선택은 브라우저에 보존되고 로그인한 고객은 기존 계정 언어 설정으로 저장됩니다. 프로필의 언어 설정에서도 변경할 수 있습니다.

고객 화면을 중심으로 번역했으며 관리자 전용 기능과 일부 동적 문구는 영어로 남을 수 있습니다. 통화·가격·시간대·공급자 설정은 언어 선택과 별개이며 언어 변경으로 원화 결제나 결제 연동이 활성화되지 않습니다.

## ItaRouter 로고 미리보기

브랜드 자산은 `web/public/brand/itarouter-symbol.svg`(딥 틸 #087F78)와 `itarouter-horizontal.svg`다. 기존 관리자 `Logo` 설정에 `/brand/itarouter-symbol.svg`를 저장하고 `SystemName`은 `ItaRouter`로 유지한다. 설정은 DB별로 적용한다.

로고는 기존 시스템 설정 경로로 홈·로그인·사이드바·푸터·동적 favicon에 표시된다. 초기 HTML favicon은 같은 SVG, `/favicon.ico`는 16/32/48px PNG 기반 ICO 대체 파일이다. 브랜드명에는 자체 호스팅 Geist 600과 -0.04em 자간을 적용한다. 기본 UI는 가변 Geist Sans, 코드는 Geist Mono를 사용하고 한글은 시스템 글꼴로 보완한다. 기본 라이트·다크 테마는 중립색 바탕과 틸 강조색을 사용하며 기존 사용자 테마·폰트·곡률·밀도 선택은 유지한다. 장식용 전체 대문자 변환은 해제하고 영문 라벨은 문장형 대소문자로 정리한다. 약어·식별자는 원래 표기를 유지한다. 라이선스는 `web/src/assets/fonts/Geist-OFL.txt`에 포함한다.

미리보기 DB·인증 정보·실행 로그는 업로드하지 않습니다. 이 변경에 배포·도메인 연결·결제 설정은 포함하지 않습니다.

## 고객 기본 메뉴 설정

[기본 설정 목록](../../config/customer-baseline.json)은 새 화면이나 앱 기본값 변경이 아닌, 기존 관리자 설정에 적용할 초기 UI 구성입니다. 파일을 checkout한다고 실행 중인 DB에 자동 적용되지 않습니다. 새 환경에서는 관리자 화면에서 아래 값을 저장합니다. 기존 운영 설정이 있다면 먼저 비교·백업하고 필요한 항목만 바꿉니다.

- 사이트 설정 → Header navigation: Home·Console·Model Square·Docs 표시. Rankings·About 숨김. Model Square의 비로그인 열람은 유지합니다. Docs는 원본 New API 문서 링크를 유지하며 자체 API 문서가 완성됐다는 뜻이 아닙니다.
- 사이트 설정 → Sidebar modules: Playground·대시보드·API Keys·사용/감사 기록·Wallet·Profile·Security 유지. 외부 채팅 바로가기와 Midjourney/Task 기록만 숨깁니다. 관리자 메뉴는 유지하며 기존 역할 권한이 적용됩니다.
- 콘텐츠 설정: API 정보·Uptime Kuma·공지·FAQ 내용이 비어 있는 초기 환경에서만 해당 패널의 표시 스위치를 끕니다. 내용을 입력해 제공할 준비가 되면 다시 켭니다. 기존 콘텐츠를 삭제하지 않습니다.

JSON의 `HeaderNavModules`와 `SidebarModulesAdmin`은 관리자 폼에서 각각 저장되는 JSON 설정값이며, API로 적용할 경우 각각 JSON 문자열로 직렬화합니다. 나머지 네 값은 같은 이름의 표시 스위치입니다. 이 파일은 독립 실행 프로그램이나 새로운 설정 로더가 아닙니다.

메뉴 숨김은 기능 삭제나 서버 권한 제어가 아닙니다. 가입·인증·보안·역할·모델·가격·사용량 차감·결제 설정은 이 구성에서 변경하지 않습니다. 실제 메일 연결과 가입 정책 검증 전에는 로컬 가입 동작을 운영 준비 완료로 취급하지 않습니다. Wallet 화면을 유지해도 결제 수단 설정·승인이 없으면 실제 충전은 활성화되지 않습니다.

검증은 일반 고객으로 홈 → 콘솔 → 키 목록 → 사용 기록 → Wallet → Profile/Security를 이동하고, 기존 관리자 설정 접근 차단과 새로고침·재시작 후 메뉴 유지 여부를 확인합니다. 실제 공급자 호출·키 발급·충전·결제는 다음 단계에서 검증합니다.


## 고객 문서 미리보기

별도 Fumadocs 앱은 `app/docs`에 있다. [문서 앱 실행 안내](../../app/docs/README.md)를 따른다. 문서는 `127.0.0.1:3019`, 기존 앱 미리보기는 `3018`을 사용한다. 로컬 Docs 설정 변경은 운영 설정에 반영되지 않는다. `NEXT_PUBLIC_SITE_URL`은 문서에서 연결할 공개 앱 주소이며 비밀값을 넣지 않는다. 정적 출력과 검색 인덱스는 `bun run build`로 생성하며 Git에 포함하지 않는다.
