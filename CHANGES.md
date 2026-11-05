# ItaRouter 변경 기록

## Signup validation and recovery — 2026-11-05

- Renew consumed Turnstile challenges after rejected signup and email-code requests while preserving form values; clear expired verification and clean up widget instances.
- Explain and validate the 20-character username limit before submission, with a readable server rejection.
- Require 8–128 characters with an English letter, a digit and a special character for new public registrations, enforced in the UI and server. Existing login and other password-setting flows retain their current policy.
- Update guidance in all ten interface languages and add regression coverage for challenge renewal, expiry, script loading, credential limits and historical login compatibility.

## README refresh — 2026-11-05

- Reorganized the English README and all nine translations around capabilities, current development status, local setup, languages and contributions.
- Matched the reference header order: centered logo and name, one-line description, license-first badges, quick links and a collapsible language selector. No CI or release badge is shown without a matching workflow or release.
- Added clone, build and startup instructions with a persistent local database and session secret; clarified environment-specific branding settings.
- Linked the public website and documented email verification and Turnstile signup while keeping provider connections, live payments and Auto marked as unconfigured. Updated source status and the modification manifest.
- Preserved upstream attribution and license links. No application behavior or upstream source changed.

## 초기 기반 준비 — 2026-11-04

- New API commit `45746eee4de25ab1eb75d4b7fbb8de2199483ea3` 원본을 app/new-api/에 포함.
- 제품 루트 README·개발 지침·실행 안내·원본 버전/고지 추가.
- AGPLv3 적용·무보증·변경 표시·해당 소스 절차를 README/ITAROUTER-NOTICE.md/SOURCE.md에 명시. 원본 NOTICE/LICENSE는 변경하지 않음.
- upstream 소스 파일은 수정하지 않음. 앱 브랜드·국내 결제·Auto는 아직 변경하지 않음.
- Bun 1.4.4/Go 1.26.10 빌드와 새 SQLite DB에서 가입·로그인·권한 차단·재시작 후 세션 유지 확인. 실제 모델·결제·메일 및 운영 환경 검증은 미실시.

## 서비스명 설정 — 2026-11-04

- 기존 SystemName 관리자 설정으로 `ItaRouter`를 적용하는 절차를 실행 안내와 README에 기록.
- 별도 로컬 미리보기 DB에서 설정 API 저장, 서버 재시작 후 유지, 홈·로그인·가입 화면 및 브라우저 제목 표시 확인. DB와 인증 정보는 커밋 대상에서 제외.
- 앱 소스·로고·도메인 연결·원본 고지는 변경하지 않음. 서비스명은 환경별 DB 설정이며 소스 기본값 변경이 아님.

## 한국어 언어팩 — 2026-11-04

- 기존 언어 메뉴와 i18next에 한국어(ko)를 등록하고 ko-KR/ko_KR 감지를 연결.
- 홈·가입·로그인·공통 고객 문구 195개를 번역. 나머지는 영어 fallback이며 전체 번역 완료를 뜻하지 않음. 브랜드명·원본 출처는 번역하지 않음.
- 동기화 스크립트의 미번역 보고에 한국어 추가. 기존 7개 언어팩은 변경하지 않음.
- 언어 변환/전환/변수 보존 테스트 5개, 타입 검사, 해당 TS 파일 lint, 프런트·Go 빌드 통과. 실제 언어 선택 후 홈·가입·로그인과 새로고침 유지 확인.
- 헤더 스타일은 원본 유지: sans-serif, 14px, weight 600, letter spacing -0.35px (현재 로컬 테마).

## 고객 언어 확장 — 2026-11-04

- 같은 로컬 브랜드 브랜치에서 Español(es), Português (Brasil)(pt-BR)을 추가해 언어 선택지를 10개로 확장. 한국어 고객 문구도 보완.
- 홈·인증·대시보드·지갑·API 키·사용 기록·프로필의 정적 번역 키를 대조하고, 공통 메뉴·페이지 이동 문구를 추가. 전체 관리자 기능과 동적 문구의 완전 번역을 뜻하지 않으며 미번역 문구는 영어로 유지.
- 한국어 1,097개, 스페인어 1,086개와 브라질 포르투갈어 1,087개 값이 영어와 다름. 공통 기술명 등은 원문 유지.
- ko-KR, es-MX, es_ES, pt, pt-BR, pt_BR 등의 언어 감지·선택 복원을 지원. 날짜/날짜시간 선택기에 한국어·스페인어·브라질 포르투갈어 달력 연결.
- 언어·날짜 선택기 테스트 22개, 타입 검사, 수정 파일 lint/포맷, 프런트·Go 빌드 통과. 기존 7개 언어팩 원문과 원본 고지는 유지.
- 로컬 일반 고객 로그인, 언어 전환, 새로고침 유지, 지갑·API 키 폼·계정 언어 설정 확인. 실제 키 생성·모델 호출·충전·결제는 미실행.

## 로고·파비콘 — 2026-11-04

- 사용자 선택 A안 이음매, 딥 틸 #087F78 로고를 추가. 기존 Logo 설정으로 헤더·로그인·사이드바·푸터와 동적 favicon에 공급한다.
- 최초 HTML favicon도 같은 SVG로 설정. 원본 로고 표시 방식을 유지하며, 정사각 SVG의 내부 여백으로 선택한 심볼을 보존한다.
- 브랜드명에만 Geist 600 / 자간 -0.025em을 적용하고 나머지 UI 폰트는 유지. 자체 호스팅 WOFF2와 원본 OFL 고지를 포함한다.
- 로컬 검토 단계이며 커밋·PR·공개 배포는 하지 않음.

## PR #2 최종 점검 — 2026-11-04

- 초기 HTML title/title 메타에 ItaRouter · New API를 함께 표시하고 README·고지·실행 안내·UPSTREAM 변경 파일 목록을 현 상태로 맞춤. 영어 fallback과 저장한 언어 → 브라우저 선호 언어 순서는 유지. IP 지역 감지는 없음.
- 브랜드명만 Geist로 표시하며 원본 NOTICE·LICENSE와 필수 출처를 유지. 푸터 링크 목록은 index 대신 데이터 키를 사용해 수정 파일 lint 오류를 해소.

## PR #2 리뷰 반영 — 2026-11-04

- 초기 HTML title/title 메타에 원본 New API 표기를 함께 보존. 실행 중 SystemName과 제품 워드마크는 ItaRouter 유지.
- 헤더·로그인·사이드바 이미지 fitting/clipping 변경을 철회해 기존 UI 동작을 유지. 선택한 정사각 SVG 내부 여백으로 심볼 형태를 보존하며 브랜드명 폰트 스타일만 변경.

## PR #2 언어 메뉴 정렬 — 2026-11-04

- English를 첫 항목으로 고정하고 나머지는 영문 언어명 알파벳순으로 정렬. 중국어 간체·번체는 인접 배치하고 메뉴에는 각 언어의 원어 이름을 표시.
- 사용자 언어 선택 저장·브라우저 감지·영어 fallback은 변경하지 않음. 지원 언어가 없으면 영어로 표시.

## 고객 기본 설정 준비 — 2026-11-04

- `config/customer-baseline.json`에 기존 New API 관리자 설정으로 적용할 메뉴·빈 콘텐츠 패널 표시값을 기록하고 실행 안내에 적용/복구 기준을 추가.
- 기존 화면·컴포넌트·서버 동작·원본 기본값은 수정하지 않음. 모델/요금·키·사용/감사 기록·지갑·계정/보안·플레이그라운드와 관리자 기능을 유지.
- 순위·소개·외부 채팅 바로가기·미사용 작업 기록은 표시 설정으로 숨김. 콘텐츠가 비어 있는 초기 환경에서만 해당 대시보드 패널을 숨기며 데이터는 유지.
- 가입·인증·권한·과금·결제·공급자·도메인 설정은 변경하지 않음. 환경별 DB에 별도 적용하며 checkout만으로 자동 반영되지 않음.

## 문서 정리 — 2026-11-04

- README 기본 언어를 영어로 정리하고 지원하는 10개 언어의 README를 연결. 제품 소개·현재 개발 상태·포함된 기능·빌드 명령·원본 안내와 고지를 같은 범위로 제공.
- 원본 New API README와 번역본은 `app/new-api/`에 보존하고 재사용 안내를 연결. 원본 프로젝트의 릴리스·후원·제휴를 ItaRouter의 실적으로 표시하지 않음.
- 로컬 실행 안내는 영어 기본과 한국어판으로 제공. SOURCE 문서는 실제 수정본이 포함된 현재 트리와 버전별 소스 제공 절차에 맞춤.

## 2026-11-05 — Customer guidance (local review)

- Reuse the existing Docs link, About, announcement and FAQ settings with a reviewable customer-guidance preset.
- Replace operator setup instructions on the home page with existing translated customer API-key guidance.
- Omit the referral card and its request/transfer wiring from the wallet page while preserving upstream components, endpoints and stored data.
- Keep payment, authentication, balances and settlement behavior unchanged.

- Refine the existing Geist 600 wordmark to -0.04em tracking, enlarge the public header lockup and align console branding. Preserve the symbol and deep teal; omit the public logo hover scaling.

- Unify the default light/dark theme with neutral surfaces and teal actions; add self-hosted variable Geist Sans/Mono with original font licenses. Preserve explicit theme preferences.
- Refine shared controls, page titles and home decoration; use authored casing and sentence-case English labels without changing translation keys or API identifiers.

- Balance translated home headlines without a forced line break, preserve Korean word boundaries, and remove the decorative pulsing badge, background grid and hero entrance/hover movement. Keep navigation and API demos intact.

- Remove the supported-app recommendations from the home page, align the desktop title color boundary with the line break, and lift dark surfaces to charcoal.

- Use the concise homepage message “Many AI models. One API.” with translated customer guidance and existing CTA routes; center the desktop hero columns while retaining the mobile stack.

- Simplify public navigation to configured customer destinations with a GitHub source link; show product/resource footer links and preserve upstream attribution. Omit unsupported homepage scale/performance promotion while keeping the underlying components available.

- Add a separate static Fumadocs customer documentation app with eight guides, local search, page navigation, code examples and ItaRouter typography/theme. Keep the existing New API application and production settings unchanged.

- Expand customer documentation from bundled source and specifications; add generated request/response references for five core endpoints with placeholder authentication and no live playground.

- Link the documentation brand to the service home; add language selection to the mobile public header. Make homepage API examples manually selected and distinguish an empty model catalogue from filtered results while preserving available-model controls.

- Reuse the homepage feature section for model discovery, per-app keys and usage review; connect each to its guide. Reuse configured customer FAQs and the shared accordion on the homepage, and clarify signup/model/documentation actions.

- Translate the bundled FAQ into all ten app languages while preserving custom administrator text. Center desktop navigation, clarify the browser title and retain reduced-motion-aware section entrances. Customer documentation remains English.
