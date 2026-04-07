import { createClient } from '@libsql/client';
import { z } from 'zod';

const activitySchema = z.object({
  id: z.string(),
  source: z.string(),
  type: z.string(),
  startAt: z.string(),
  endAt: z.string().nullable().optional(),
  metrics: z.record(z.any()).optional(),
  updatedAt: z.string(),
  dirty: z.boolean().optional(),
});

const payloadSchema = z.object({
  activities: z.array(activitySchema),
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
    CREATE TABLE IF NOT EXISTS activities (
      id TEXT PRIMARY KEY,
      source TEXT NOT NULL,
      type TEXT NOT NULL,
      start_at TEXT NOT NULL,
      end_at TEXT,
      metrics_json TEXT NOT NULL,
      updated_at TEXT NOT NULL
    )
  `);

  await db.execute('CREATE INDEX IF NOT EXISTS idx_activities_start_at ON activities (start_at)');
  await db.execute('CREATE INDEX IF NOT EXISTS idx_activities_type ON activities (type)');
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
    for (const activity of parsed.data.activities) {
      await db.execute({
        sql: `
          INSERT INTO activities (id, source, type, start_at, end_at, metrics_json, updated_at)
          VALUES (?, ?, ?, ?, ?, ?, ?)
          ON CONFLICT(id) DO UPDATE SET
            source = excluded.source,
            type = excluded.type,
            start_at = excluded.start_at,
            end_at = excluded.end_at,
            metrics_json = excluded.metrics_json,
            updated_at = excluded.updated_at
        `,
        args: [
          activity.id,
          activity.source,
          activity.type,
          activity.startAt,
          activity.endAt ?? null,
          JSON.stringify(activity.metrics ?? {}),
          activity.updatedAt,
        ],
      });
      ackedIds.push(activity.id);
    }

    return json({ ackedIds });
  },
};
