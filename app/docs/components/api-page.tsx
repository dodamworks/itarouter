'use client';
import { createOpenAPIPage } from 'fumadocs-openapi/ui';
import { createCodeUsageGeneratorRegistry } from 'fumadocs-openapi/requests/generators';
import { registerDefault } from 'fumadocs-openapi/requests/generators/all';

const codeUsages = registerDefault(createCodeUsageGeneratorRegistry());
for (const [id, generator] of codeUsages.map()) {
  codeUsages.add(id, {
    ...generator,
    generate(data, context) {
      return generator.generate({
        ...data,
        header: {
          Authorization: { value: 'Bearer YOUR_ITAROUTER_KEY' },
          ...data.header,
        },
      }, context);
    },
  });
}
export const OpenAPIPage = createOpenAPIPage({ codeUsages, playground: { enabled: false } });
