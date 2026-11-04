<p align="center"><img src="app/new-api/web/public/brand/itarouter-symbol.svg" width="64" height="64" alt="ItaRouter"></p>

# ItaRouter

[English](README.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [Français](README.fr.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Português (Brasil)](README.pt-BR.md) · [Русский](README.ru.md) · **Español** · [Tiếng Việt](README.vi.md)

Una pasarela de APIs de IA basada en [New API](https://github.com/QuantumNous/new-api). Usa la consola web existente para gestionar conexiones a modelos, cuentas de clientes, claves API, saldo y uso.

Dominio: `itarouter.com`

## Estado actual

El proyecto está en una fase inicial de desarrollo. Ya se han aplicado la identidad ItaRouter, el logotipo y las traducciones de las pantallas de clientes. Las conexiones a proveedores, los pagos reales y la selección automática de modelos aún no están configurados.

La interfaz admite inglés, chino simplificado y tradicional, francés, japonés, coreano, portugués de Brasil, ruso, español y vietnamita. El texto sin traducir se muestra en inglés.

## Qué incluye

- Las pantallas existentes de catálogo de modelos, playground, claves API, uso, monedero, perfil y seguridad.
- El backend y el frontend del proyecto original con una revisión fija y los avisos de autoría conservados.
- Logotipo, favicon y marca denominativa de ItaRouter con Geist. Los menús de clientes usan la configuración de administración existente.

## Ejecución local

Requisitos: Bun 1.4.4, Go 1.26.10 y herramientas de compilación C/C++. La verificación local usa SQLite.

```sh
mkdir -p .local/dev/bin
(cd app/new-api/web && bun install --frozen-lockfile && bun run build)
(cd app/new-api && GOTOOLCHAIN=auto go build -o ../../.local/dev/bin/new-api .)
```

Ejecuta los comandos desde la raíz del repositorio. Consulta la [guía local](docs/development/LOCAL-RUN.md) para el arranque, el secreto de sesión, la primera cuenta de administrador y la configuración de marca. No uses la configuración local directamente en producción.

## Archivos del proyecto

- [UPSTREAM.json](UPSTREAM.json): revisión fija de New API y archivos modificados.
- [CHANGES.md](CHANGES.md): cambios de ItaRouter.
- [SOURCE.md](SOURCE.md): alcance del código fuente y distribución correspondiente a cada versión desplegada.

- [New API — upstream README](app/new-api/README.md)

---

Basado en New API bajo [AGPLv3](LICENSE). Consulta la [NOTICE original](NOTICE), el [aviso de ItaRouter](ITAROUTER-NOTICE.md) y los [avisos de terceros](app/new-api/THIRD-PARTY-LICENSES.md).

Frontend design and development by New API contributors.
