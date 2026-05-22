import { buildCodexPayload } from '../src/utils/codexEngine.js';

async function readBody(request) {
  const chunks = [];

  for await (const chunk of request) {
    chunks.push(Buffer.from(chunk));
  }

  if (chunks.length === 0) {
    return {};
  }

  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8'));
  } catch (error) {
    return {};
  }
}

async function handleCodexRequest(req, res) {
  const body = await readBody(req);
  const input = typeof body.input === 'string' ? body.input : '';
  const connectors = body.context?.connectors;
  const payload = buildCodexPayload(input, connectors);

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(payload));
}

function mountCodexEndpoint(server) {
  server.middlewares.use(async (req, res, next) => {
    if (req.method === 'POST' && req.url === '/api/codex') {
      await handleCodexRequest(req, res);
      return;
    }

    next();
  });
}

export function codexEndpointPlugin() {
  return {
    name: 'codex-endpoint-plugin',
    configureServer(server) {
      mountCodexEndpoint(server);
    },
    configurePreviewServer(server) {
      mountCodexEndpoint(server);
    },
  };
}
