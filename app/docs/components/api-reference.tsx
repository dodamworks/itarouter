import { openapi } from '@/lib/openapi';
import { OpenAPIPage } from './api-page';
import type { HttpMethods } from 'fumadocs-openapi';

export async function ApiReference({ path, method }: { path: string; method: HttpMethods }) {
  const { bundled } = await openapi.getSchema('itarouter');
  return <OpenAPIPage document="itarouter" payload={{ bundled }} operations={[{ path, method }]} showTitle={false} />;
}
