<p align="center">
  <img src="app/new-api/web/public/brand/itarouter-symbol.svg" alt="ItaRouter" width="88" height="88">
</p>

<h1 align="center">ItaRouter</h1>

<p align="center"><strong>Разные модели ИИ. Один API.</strong></p>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-AGPLv3-087F78" alt="License: AGPLv3"></a>
  <img src="https://img.shields.io/badge/status-development-087F78" alt="Status: development">
  <a href="https://github.com/dodamworks/itarouter/stargazers"><img src="https://img.shields.io/github/stars/dodamworks/itarouter?style=flat&amp;label=GitHub%20stars&amp;color=087F78" alt="GitHub stars"></a>
</p>

Открытый шлюз API для ИИ на базе [New API](https://github.com/QuantumNous/new-api). Подключайте провайдеров моделей и управляйте аккаунтами клиентов, API-ключами, балансом и использованием в одной веб-консоли.

<p align="center">
  <a href="#get-started">Локальный запуск</a> ·
  <a href="https://github.com/dodamworks/itarouter/issues">Сообщить об ошибке</a> ·
  <a href="#contributing">Участвовать</a>
</p>

<details>
<summary>Выберите язык · 10 языков</summary>

[English](README.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [Français](README.fr.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Português (Brasil)](README.pt-BR.md) · **Русский** · [Español](README.es.md) · [Tiếng Việt](README.vi.md)

</details>

[itarouter.com](https://itarouter.com)

## Текущее состояние

Сайт доступен по адресу [itarouter.com](https://itarouter.com). Регистрация использует подтверждение электронной почты и Cloudflare Turnstile. Проект находится на ранней стадии: подключение поставщиков моделей, реальные платежи и автоматический выбор моделей ещё не настроены.

## Возможности

- **Доступ к моделям:** настройка провайдеров, каталог моделей и проверка запросов в playground.
- **Доступ к API:** управление аккаунтами клиентов и API-ключами в существующей консоли.
- **Баланс и использование:** кошелёк, история заказов на пополнение, баланс и журналы использования. Для реальных платежей требуется настроенный платёжный провайдер.
- **Многоязычная консоль:** сохранены экраны New API, добавлены оформление ItaRouter и переводы клиентских экранов.

<a id="get-started"></a>

## Локальный запуск

Нужны Git, Bun **1.4.4**, Go **1.26.10** (или автоматическая загрузка инструментария Go), инструменты C/C++ и OpenSSL. Для загрузки зависимостей нужен доступ к сети. Локальная конфигурация использует SQLite; Redis, ключ провайдера моделей и платёжный аккаунт не нужны.

Клонируйте репозиторий и соберите проект:

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

Запустите сервер из корня репозитория:

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

Откройте **http://127.0.0.1:3017/** и настройте первого администратора. В существующих настройках сайта задайте `SystemName` = `ItaRouter` и `Logo` = `/brand/itarouter-symbol.svg`. Остановите сервер с помощью Ctrl+C; повторный запуск сохранит ту же базу и секрет сессии.

Сервер слушает все сетевые интерфейсы. Эта конфигурация предназначена для локальной разработки; не публикуйте её в интернете. Смена порта, первоначальная настройка и меню клиентов описаны в [руководстве](docs/development/LOCAL-RUN.md). Образ Docker `latest` исходного проекта не содержит изменений ItaRouter.

## Языки

Интерфейс поддерживает английский, упрощённый и традиционный китайский, французский, японский, корейский, бразильский португальский, русский, испанский и вьетнамский языки. Непереведённый текст отображается на английском.

По умолчанию и при отсутствии перевода используется английский. Сохранённый выбор важнее предпочтений браузера; после входа применяется язык аккаунта. Геолокация по IP не используется. Часть административных и динамических текстов остаётся на английском.

<a id="contributing"></a>

## Участие в разработке

Сначала опишите нужное поведение или улучшение в [issue](https://github.com/dodamworks/itarouter/issues). Используйте существующие экраны и настройки, ограничивайте объём изменений и прикладывайте результаты проверки. Сохраняйте исходные уведомления и не отправляйте учётные данные, базы или журналы.

## Документация

- [UPSTREAM.json](UPSTREAM.json): зафиксированная ревизия New API и изменённые файлы.
- [CHANGES.md](CHANGES.md): изменения ItaRouter.
- [SOURCE.md](SOURCE.md): состав исходного кода и предоставление исходников для конкретной развёрнутой версии.
- [New API — upstream README](app/new-api/README.md)

---

Основано на New API под [AGPLv3](LICENSE). См. [исходную NOTICE](NOTICE), [уведомление ItaRouter](ITAROUTER-NOTICE.md) и [уведомления третьих сторон](app/new-api/THIRD-PARTY-LICENSES.md).

Frontend design and development by New API contributors.
