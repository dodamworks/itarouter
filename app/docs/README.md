# ItaRouter docs

Customer documentation built with Fumadocs. English is the initial documentation language; this does not change the main app language packs.

```sh
bun install --frozen-lockfile
NEXT_PUBLIC_SITE_URL=http://127.0.0.1:3018 bun run dev --hostname 127.0.0.1 --port 3019
```

Open http://127.0.0.1:3019/docs. `NEXT_PUBLIC_SITE_URL` is a public site URL, not a secret; omit it to link to https://itarouter.com.

`bun run build` exports the site into `out/`, including the static search index. Keep build output, caches, environment files and dependencies out of Git. No hosting or DNS setup is included.

Content lives in `content/docs`. Keep availability, prices and payment policies aligned with the service before publishing. Fumadocs package notices are in `THIRD-PARTY-LICENSES.md`; font notices are in `public/fonts`.

## API reference source

`bun run docs:sync-api` derives a five-endpoint customer reference from the bundled New API relay schema. `scripts/sync-openapi.mjs` selects those routes, removes unrelated schema examples, supplies preview-safe examples and retains referenced schemas. `bun run build` runs it automatically. The official Fumadocs OpenAPI component renders fields and response schemas; the interactive playground is disabled.

When upstream changes, review the endpoint selection and format descriptions, regenerate the schema, and verify the documentation build. Schema support is separate from live model/channel availability. Customer guide sources are mapped in `CONTENT-SOURCES.md`.
