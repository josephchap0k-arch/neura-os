import { buildCodexPayload } from '../utils/codexEngine';

export async function requestCodexParse(input, context = {}) {
  try {
    const response = await fetch('/api/codex', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input,
        context,
      }),
    });

    if (!response.ok) {
      throw new Error(`CODEX endpoint returned ${response.status}`);
    }

    return response.json();
  } catch (error) {
    return buildCodexPayload(input, context.connectors);
  }
}
