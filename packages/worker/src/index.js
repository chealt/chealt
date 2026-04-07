import { createClient } from '@libsql/client';
import { z } from 'zod';

const entrySchema = z.object({
  id: z.string(),
  title: z.string(),
  updatedAt: z.string(),
  dirty: z.boolean().optional(),
});

const payloadSchema = z.object({
  entries: z.array(entrySchema),
});

function json(data, init) {
  return new Response(JSON.stringify(data), {
    headers: { 'content-type': 'application/json' },
    ...init,
  });
}

async function ensureSchema(env) {
  const db = createClient({
    url: env.TURSO_DATABASE_URL,
    authToken: env.TURSO_AUTH_TOKEN,
  });

  await db.execute(`
    CREATE TABLE IF NOT EXISTS entries (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      updated_at TEXT NOT NULL
    )
  `);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/health') {
      return json({ ok: true });
    }

    if (url.pathname !== '/api/sync' || request.method !== 'POST') {
      return json({ error: 'not found' }, { status: 404 });
    }

    const apiKey = request.headers.get('x-sync-key');
    if (!apiKey || apiKey !== env.SYNC_API_KEY) {
      return json({ error: 'unauthorized' }, { status: 401 });
    }

    let payload;
    try {
      payload = await request.json();
    } catch {
      return json({ error: 'invalid json' }, { status: 400 });
    }

    const parsed = payloadSchema.safeParse(payload);
    if (!parsed.success) {
      return json({ error: 'invalid payload', details: parsed.error.issues }, { status: 400 });
    }

    await ensureSchema(env);

    const db = createClient({
      url: env.TURSO_DATABASE_URL,
      authToken: env.TURSO_AUTH_TOKEN,
    });

    const ackedIds = [];
    for (const entry of parsed.data.entries) {
      await db.execute({
        sql: `
          INSERT INTO entries (id, title, updated_at)
          VALUES (?, ?, ?)
          ON CONFLICT(id) DO UPDATE SET
            title = excluded.title,
            updated_at = excluded.updated_at
        `,
        args: [entry.id, entry.title, entry.updatedAt],
      });
      ackedIds.push(entry.id);
    }

    return json({ ackedIds });
  },
};
