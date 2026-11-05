import fs from 'node:fs/promises';
const input = JSON.parse(await fs.readFile(new URL('../../new-api/docs/openapi/relay.json', import.meta.url), 'utf8'));
const entries = [
  ['/v1/models', 'get', 'List models', 'List model IDs visible to your API key in the OpenAI-compatible format.'],
  ['/v1/chat/completions', 'post', 'Chat completions', 'Generate a response from a message history. Optional parameters depend on the selected model and channel.'],
  ['/v1/responses', 'post', 'Responses', 'Create a response using the Responses request format. Conversation state and advanced features depend on the connected model and channel.'],
  ['/v1/messages', 'post', 'Messages', 'Use the Anthropic-compatible Messages request format. Supply anthropic-version and an ItaRouter API key.'],
  ['/v1/embeddings', 'post', 'Embeddings', 'Convert text into vectors using an available embedding model.'],
];
function clean(value) {
  if (Array.isArray(value)) return value.map(clean);
  if (!value || typeof value !== 'object') return value;
  const result = {};
  for (const [key, item] of Object.entries(value)) {
    if (['example', 'examples'].includes(key)) continue;
    if (['description', 'summary', 'title'].includes(key) && typeof item === 'string' && /[\u3400-\u9fff]/u.test(item)) continue;
    if (key === '$ref' && !item.startsWith('#/components/schemas/')) throw new Error(`Unsupported reference: ${item}`);
    result[key] = clean(item);
  }
  return result;
}
const paths = {};
for (const [path, method, summary, description] of entries) {
  if (!input.paths[path]?.[method]) throw new Error(`Upstream endpoint missing: ${method} ${path}`);
  const operation = clean(input.paths[path][method]);
  operation.summary = summary;
  operation.description = description;
  operation.tags = ['API reference'];
  operation.parameters = path === '/v1/models' ? [] : operation.parameters;
  for (const parameter of operation.parameters || []) {
    parameter.description = parameter.name === 'anthropic-version' ? 'API format version, for example 2023-06-01.' : 'An ItaRouter-issued API key.';
    if (parameter.name === 'anthropic-version') parameter.example = '2023-06-01';
  }
  for (const [status, response] of Object.entries(operation.responses || {})) response.description = status === '200' ? 'Successful response.' : 'Request could not be completed. Read the error body for details.';
  paths[path] = { [method]: operation };
}
const samples = {
  '/v1/chat/completions': { model: 'MODEL_ID_FROM_CATALOGUE', messages: [{ role: 'user', content: 'Hello' }] },
  '/v1/responses': { model: 'MODEL_ID_FROM_CATALOGUE', input: 'Hello' },
  '/v1/messages': { model: 'MODEL_ID_FROM_CATALOGUE', max_tokens: 256, messages: [{ role: 'user', content: 'Hello' }] },
  '/v1/embeddings': { model: 'EMBEDDING_MODEL_ID_FROM_CATALOGUE', input: 'Text to embed' },
};
for (const [path, sample] of Object.entries(samples)) paths[path].post.requestBody.content['application/json'].example = sample;
const responseSamples = {
  '/v1/models': { object: 'list', data: [{ id: 'MODEL_ID_FROM_CATALOGUE', object: 'model', created: 0, owned_by: 'example-provider' }] },
  '/v1/chat/completions': { id: 'chatcmpl-example', object: 'chat.completion', created: 0, model: 'MODEL_ID_FROM_CATALOGUE', choices: [{ index: 0, message: { role: 'assistant', content: 'Hello' }, finish_reason: 'stop' }], usage: { prompt_tokens: 5, completion_tokens: 1, total_tokens: 6 } },
  '/v1/responses': { id: 'resp_example', object: 'response', status: 'completed', model: 'MODEL_ID_FROM_CATALOGUE', output: [{ type: 'message', role: 'assistant', content: [{ type: 'output_text', text: 'Hello' }] }] },
  '/v1/messages': { id: 'msg_example', type: 'message', role: 'assistant', model: 'MODEL_ID_FROM_CATALOGUE', content: [{ type: 'text', text: 'Hello' }], stop_reason: 'end_turn', usage: { input_tokens: 5, output_tokens: 1 } },
  '/v1/embeddings': { object: 'list', data: [{ object: 'embedding', index: 0, embedding: [0.1, -0.2, 0.3] }], model: 'EMBEDDING_MODEL_ID_FROM_CATALOGUE', usage: { prompt_tokens: 3, total_tokens: 3 } },
};
for (const [path, sample] of Object.entries(responseSamples)) {
  const operation = paths[path][path === '/v1/models' ? 'get' : 'post'];
  operation.responses['200'].content['application/json'].example = sample;
}
const schemas = {};
function collect(value) {
  if (!value || typeof value !== 'object') return;
  if (value.$ref) {
    const name = value.$ref.split('/').at(-1);
    if (!schemas[name]) {
      if (!input.components.schemas[name]) throw new Error(`Missing schema: ${name}`);
      schemas[name] = clean(input.components.schemas[name]);
      collect(schemas[name]);
    }
  }
  for (const item of Object.values(value)) collect(item);
}
collect(paths);
for (const schema of Object.values(schemas)) {
  if (schema.properties?.model) schema.properties.model.example = 'MODEL_ID_FROM_CATALOGUE';
}
const document = {
  openapi: input.openapi,
  info: { title: 'ItaRouter API reference', version: 'preview', description: 'Reference derived from the bundled New API relay specification. Endpoint documentation is not a live model-availability guarantee. Model access is being prepared.' },
  servers: [{ url: 'https://itarouter.com', description: 'Public service address; inference access is being prepared.' }],
  paths,
  components: { securitySchemes: { BearerAuth: { type: 'http', scheme: 'bearer', description: 'ItaRouter API key, not a browser login token.' }, ApiKeyAuth: { type: 'apiKey', in: 'header', name: 'x-api-key', description: 'ItaRouter key for the Messages format.' } }, schemas },
};
document.paths['/v1/messages'].post.security = [{ BearerAuth: [] }, { ApiKeyAuth: [] }];
await fs.writeFile(new URL('../openapi/relay.json', import.meta.url), JSON.stringify(document, null, 2) + '\n');
console.log(`Generated ${entries.length} customer endpoints and ${Object.keys(schemas).length} referenced schemas.`);
