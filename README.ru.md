<p align="center"><img src="app/new-api/web/public/brand/itarouter-symbol.svg" width="64" height="64" alt="ItaRouter"></p>

# ItaRouter

[English](README.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [Français](README.fr.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Português (Brasil)](README.pt-BR.md) · **Русский** · [Español](README.es.md) · [Tiếng Việt](README.vi.md)

Шлюз API для ИИ на базе [New API](https://github.com/QuantumNous/new-api). Существующая веб-консоль позволяет управлять подключениями к моделям, аккаунтами клиентов, API-ключами, балансом и использованием.

Домен: `itarouter.com`

## Текущее состояние

Проект находится на ранней стадии разработки. Добавлены название и логотип ItaRouter, а также переводы клиентских экранов. Подключения к провайдерам, реальные платежи и автоматический выбор моделей пока не настроены.

Интерфейс поддерживает английский, упрощённый и традиционный китайский, французский, японский, корейский, бразильский португальский, русский, испанский и вьетнамский языки. Непереведённый текст отображается на английском.

## Что включено

- Существующие экраны каталога моделей, playground, API-ключей, использования, кошелька, профиля и безопасности.
- Серверная и клиентская части исходного проекта с зафиксированной ревизией и сохранёнными уведомлениями об авторстве.
- Логотип, favicon и словесный знак ItaRouter на шрифте Geist. Клиентские меню используют существующие настройки администратора.

## Локальный запуск

Требуются Bun 1.4.4, Go 1.26.10 и инструменты сборки C/C++. Локальная проверка использует SQLite.

```sh
mkdir -p .local/dev/bin
(cd app/new-api/web && bun install --frozen-lockfile && bun run build)
(cd app/new-api && GOTOOLCHAIN=auto go build -o ../../.local/dev/bin/new-api .)
```

Запускайте команды из корня репозитория. В [руководстве](docs/development/LOCAL-RUN.md) описаны запуск, секрет сессии, первый аккаунт администратора и настройки бренда. Не используйте локальную конфигурацию без изменений в рабочей среде.

## Файлы проекта

- [UPSTREAM.json](UPSTREAM.json): зафиксированная ревизия New API и изменённые файлы.
- [CHANGES.md](CHANGES.md): изменения ItaRouter.
- [SOURCE.md](SOURCE.md): состав исходного кода и предоставление исходников для конкретной развёрнутой версии.

- [New API — upstream README](app/new-api/README.md)

---

Основано на New API под [AGPLv3](LICENSE). См. [исходную NOTICE](NOTICE), [уведомление ItaRouter](ITAROUTER-NOTICE.md) и [уведомления третьих сторон](app/new-api/THIRD-PARTY-LICENSES.md).

Frontend design and development by New API contributors.
