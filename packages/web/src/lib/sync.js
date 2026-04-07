import { listDirtyEntries, markClean } from './db';

const apiUrl = import.meta.env.PUBLIC_SYNC_API_URL ?? 'http://127.0.0.1:8787';
const apiKey = import.meta.env.PUBLIC_SYNC_API_KEY ?? '';

export async function syncDirtyEntries() {
  const dirty = await listDirtyEntries();
  if (dirty.length === 0) return 0;

  const response = await fetch(`${apiUrl}/api/sync`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-sync-key': apiKey,
    },
    body: JSON.stringify({ entries: dirty }),
  });

  if (!response.ok) {
    throw new Error(`sync failed with status ${response.status}`);
  }

  const data = await response.json();
  await markClean(data.ackedIds);
  return data.ackedIds.length;
}
