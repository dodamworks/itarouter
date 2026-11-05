import { createOpenAPI } from 'fumadocs-openapi/server';
export const openapi = createOpenAPI({ input: { itarouter: './openapi/relay.json' } });
