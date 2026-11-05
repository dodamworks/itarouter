<p align="center">
  <img src="app/new-api/web/public/brand/itarouter-symbol.svg" alt="ItaRouter" width="88" height="88">
</p>

<h1 align="center">ItaRouter</h1>

<p align="center"><strong>Muchos modelos de IA. Una sola API.</strong></p>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-AGPLv3-087F78" alt="License: AGPLv3"></a>
  <img src="https://img.shields.io/badge/status-development-087F78" alt="Status: development">
  <a href="https://github.com/dodamworks/itarouter/stargazers"><img src="https://img.shields.io/github/stars/dodamworks/itarouter?style=flat&amp;label=GitHub%20stars&amp;color=087F78" alt="GitHub stars"></a>
</p>

Una pasarela de APIs de IA de código abierto basada en [New API](https://github.com/QuantumNous/new-api). Conecta proveedores de modelos y gestiona cuentas de clientes, claves API, saldo y uso desde una sola consola web.

<p align="center">
  <a href="#get-started">Ejecutar en local</a> ·
  <a href="https://github.com/dodamworks/itarouter/issues">Informar de un error</a> ·
  <a href="#contributing">Contribuir</a>
</p>

<details>
<summary>Lee en tu idioma · 10 idiomas</summary>

[English](README.md) · [简体中文](README.zh-CN.md) · [繁體中文](README.zh-TW.md) · [Français](README.fr.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Português (Brasil)](README.pt-BR.md) · [Русский](README.ru.md) · **Español** · [Tiếng Việt](README.vi.md)

</details>

[itarouter.com](https://itarouter.com)

## Estado actual

El sitio público está disponible en [itarouter.com](https://itarouter.com). El registro utiliza verificación por correo y Cloudflare Turnstile. Es una versión inicial: los proveedores de modelos, los pagos reales y la selección automática de modelos aún no están configurados.

## Funcionalidades

- **Acceso a modelos:** configura proveedores, consulta el catálogo y prueba solicitudes en el playground.
- **Acceso a la API:** gestiona cuentas de clientes y claves API en la consola existente.
- **Saldo y uso:** utiliza el monedero, los registros de pedidos de recarga, los saldos y los registros de uso. Los pagos reales requieren un proveedor de pagos configurado.
- **Consola multilingüe:** se conservan las pantallas de New API, con la identidad ItaRouter y traducciones centradas en los clientes.

<a id="get-started"></a>

## Empezar en local

Necesitas Git, Bun **1.4.4**, Go **1.26.10** (o descarga automática de la cadena Go), herramientas C/C++ y OpenSSL. La descarga de dependencias requiere acceso a la red. Esta configuración usa SQLite; no necesita Redis, clave de proveedor de modelos ni cuenta de pago.

Clona el repositorio y compila:

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

Inicia el servidor desde la raíz del repositorio:

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

Abre **http://127.0.0.1:3017/** y configura el primer administrador. En los ajustes existentes del sitio, establece `SystemName` en `ItaRouter` y `Logo` en `/brand/itarouter-symbol.svg`. Detén el servidor con Ctrl+C; vuelve a ejecutar el bloque de inicio para conservar la misma base de datos y el mismo secreto de sesión.

El servidor escucha en todas las interfaces de red. Esta configuración es para desarrollo local; no la expongas a Internet. Para cambiar el puerto, configurar el sitio y los menús de clientes, consulta la [guía local](docs/development/LOCAL-RUN.md). La imagen Docker `latest` del proyecto original no contiene las modificaciones de ItaRouter.

## Idiomas

La interfaz admite inglés, chino simplificado y tradicional, francés, japonés, coreano, portugués de Brasil, ruso, español y vietnamita. El texto sin traducir se muestra en inglés.

El inglés es el idioma predeterminado y de respaldo. La elección guardada tiene prioridad sobre el navegador; al iniciar sesión se aplica el idioma guardado en la cuenta. No se usa geolocalización por IP. Parte del texto administrativo y dinámico permanece en inglés.

<a id="contributing"></a>

## Contribuir

Empieza con una [issue](https://github.com/dodamworks/itarouter/issues) que describa el comportamiento o la mejora deseada. Reutiliza las pantallas y los ajustes existentes, mantén los cambios acotados e incluye la verificación pertinente. Conserva los avisos originales y no envíes credenciales, bases de datos ni registros.

## Documentación

- [UPSTREAM.json](UPSTREAM.json): revisión fija de New API y archivos modificados.
- [CHANGES.md](CHANGES.md): cambios de ItaRouter.
- [SOURCE.md](SOURCE.md): alcance del código fuente y distribución correspondiente a cada versión desplegada.
- [New API — upstream README](app/new-api/README.md)

---

Basado en New API bajo [AGPLv3](LICENSE). Consulta la [NOTICE original](NOTICE), el [aviso de ItaRouter](ITAROUTER-NOTICE.md) y los [avisos de terceros](app/new-api/THIRD-PARTY-LICENSES.md).

Frontend design and development by New API contributors.
