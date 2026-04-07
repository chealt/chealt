import JSZip from 'jszip';
import { queryActivities, replaceActivities, summarizeActivities } from '../lib/db';
import { syncActivities } from '../lib/sync';

const IDLE_SYNC_AFTER_MS = 12_000;
const IDLE_SYNC_INTERVAL_MS = 30_000;

class LocalFirstApp extends HTMLElement {
  connectedCallback() {
    this.lastInteractionAt = Date.now();
    this.activePage = 'all';
    this.isSyncing = false;
    this.selectedFile = null;
    this.render();
    this.bind();
    this.startIdleSync();
    void this.refreshVisualization();
  }

  disconnectedCallback() {
    if (this.idleSyncTimer) clearInterval(this.idleSyncTimer);
    if (this.idleSyncFallbackTimer) clearTimeout(this.idleSyncFallbackTimer);
  }

  render() {
    const section = document.createElement('section');
    section.className = 'dashboard';

    const hero = document.createElement('header');
    hero.className = 'hero';

    const heading = document.createElement('h2');
    heading.textContent = 'Health Timeline Dashboard';

    const description = document.createElement('p');
    description.textContent =
      'Import your export ZIP once. Data is saved locally in IndexedDB, split into separate activity pages, and synced automatically when idle.';

    hero.append(heading, description);

    const uploadPanel = document.createElement('section');
    uploadPanel.className = 'panel';

    const uploadTitle = document.createElement('h3');
    uploadTitle.textContent = 'Import data';

    const uploadRow = document.createElement('div');
    uploadRow.className = 'explorer-controls';

    const dropCard = document.createElement('button');
    dropCard.type = 'button';
    dropCard.id = 'upload-dropzone';
    dropCard.className = 'upload-card';
    dropCard.textContent = 'Drop ZIP here or click to choose a file';

    const fileInput = document.createElement('input');
    fileInput.id = 'upload-input';
    fileInput.type = 'file';
    fileInput.accept = '.zip';
    fileInput.setAttribute('aria-label', 'Health export ZIP');
    fileInput.hidden = true;
    uploadRow.append(dropCard, fileInput);

    const status = document.createElement('p');
    status.id = 'status';
    status.className = 'status';
    status.setAttribute('role', 'status');
    status.setAttribute('aria-live', 'polite');
    status.textContent = 'Ready to import data.';
    uploadPanel.append(uploadTitle, uploadRow, status);

    const summary = document.createElement('section');
    summary.id = 'summary';
    summary.className = 'panel';

    const performance = document.createElement('section');
    performance.id = 'performance-cards';
    performance.className = 'cards-grid';

    const chart = document.createElement('section');
    chart.id = 'chart';
    chart.className = 'types-list';

    const list = document.createElement('section');
    list.id = 'activity-list';
    list.className = 'types-list';

    section.append(hero, uploadPanel, summary, performance, chart, list);
    this.replaceChildren(section);

    this.statusEl = this.querySelector('#status');
    this.summaryEl = this.querySelector('#summary');
    this.performanceEl = this.querySelector('#performance-cards');
    this.chartEl = this.querySelector('#chart');
    this.listEl = this.querySelector('#activity-list');
    this.pageNavEl = document.querySelector('#activity-pages');
  }

  bind() {
    const navToggle = document.querySelector('#nav-toggle');
    const globalSidenav = document.querySelector('.global-sidenav');
    navToggle?.addEventListener('click', () => {
      globalSidenav?.classList.toggle('is-collapsed');
      globalSidenav?.classList.toggle('is-expanded');
    });
    this.pageNavEl?.querySelectorAll('[data-page]').forEach((item) => {
      item.addEventListener('click', () => {
        this.markInteraction();
        this.activePage = item.getAttribute('data-page') ?? 'all';
        void this.refreshVisualization();
      });
    });

    const fileInput = this.querySelector('#upload-input');
    const dropzone = this.querySelector('#upload-dropzone');

    dropzone.addEventListener('click', () => {
      fileInput.click();
    });

    fileInput.addEventListener('change', () => {
      this.selectedFile = fileInput.files?.[0] ?? null;
      if (this.selectedFile) {
        dropzone.textContent = `Selected: ${this.selectedFile.name}`;
        void this.importZip();
      }
    });

    dropzone.addEventListener('dragover', (event) => {
      event.preventDefault();
      dropzone.classList.add('is-dragover');
    });

    dropzone.addEventListener('dragleave', () => {
      dropzone.classList.remove('is-dragover');
    });

    dropzone.addEventListener('drop', (event) => {
      event.preventDefault();
      dropzone.classList.remove('is-dragover');
      const file = event.dataTransfer?.files?.[0] ?? null;
      if (!file) return;

      this.selectedFile = file;
      dropzone.textContent = `Selected: ${file.name}`;
      void this.importZip();
    });

    const interactiveEvents = ['click', 'keydown', 'mousemove', 'touchstart', 'scroll'];
    for (const eventName of interactiveEvents) {
      window.addEventListener(eventName, () => this.markInteraction(), { passive: true });
    }
  }

  markInteraction() {
    this.lastInteractionAt = Date.now();
  }

  startIdleSync() {
    this.idleSyncTimer = setInterval(() => {
      void this.syncIfIdle();
    }, IDLE_SYNC_INTERVAL_MS);
  }

  async syncIfIdle() {
    if (this.isSyncing) return;
    if (Date.now() - this.lastInteractionAt < IDLE_SYNC_AFTER_MS) return;

    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        void this.syncNow();
      });
      return;
    }

    this.idleSyncFallbackTimer = setTimeout(() => {
      void this.syncNow();
    }, 1_000);
  }

  async importZip() {
    const file = this.selectedFile ?? this.querySelector('#upload-input').files?.[0];
    if (!file) {
      this.statusEl.textContent = 'Please choose a ZIP file first.';
      return;
    }

    this.markInteraction();
    this.statusEl.textContent = `Preparing ${file.name}...`;

    try {
      const zip = await JSZip.loadAsync(await file.arrayBuffer(), {
        createFolders: false,
        checkCRC32: false,
      });
      this.statusEl.textContent = 'ZIP loaded. Parsing activity records...';

      const activities = await parseActivitiesFromZip(zip, (progress) => {
        this.statusEl.textContent = progress;
      });
      await replaceActivities(activities);
      await this.refreshVisualization();
      this.statusEl.textContent = `Imported ${activities.length} records.`;
      setTimeout(() => {
        void this.syncNow();
      }, 1_500);
    } catch (error) {
      this.statusEl.textContent = `Import failed: ${error.message}`;
    }
  }

  async syncNow() {
    this.isSyncing = true;

    try {
      await syncActivities();
      await this.refreshVisualization();
    } catch {
      // Keep sync silent in the UI.
    } finally {
      this.isSyncing = false;
    }
  }

  getCurrentFilters() {
    return {
      from: '',
      to: '',
      type: this.activePage,
    };
  }

  async refreshVisualization() {
    const filters = this.getCurrentFilters();

    const [activities, summary] = await Promise.all([
      queryActivities(filters),
      summarizeActivities(filters),
    ]);

    this.renderPages();
    this.renderSummary(summary);
    this.renderPerformanceCards(activities);
    this.renderChart(summary.byType);
    this.renderList(activities.slice(0, 120));
  }

  renderPages() {
    if (!this.pageNavEl) return;
    this.pageNavEl.querySelectorAll('[data-page]').forEach((item) => {
      const pageValue = item.getAttribute('data-page');
      const isActive = pageValue === this.activePage;
      item.classList.toggle('is-active', isActive);
      item.setAttribute('aria-current', isActive ? 'page' : 'false');
    });
  }

  renderSummary(summary) {
    this.summaryEl.replaceChildren();

    const title = document.createElement('h3');
    title.textContent = this.activePage === 'all' ? 'Overview' : `${toLabel(this.activePage)} page`;

    const total = document.createElement('p');
    total.textContent = `Total records in current view: ${summary.total}`;

    this.summaryEl.append(title, total);
  }

  renderPerformanceCards(activities) {
    this.performanceEl.replaceChildren();

    const runs = activities.filter((item) => item.type === 'run');
    const walks = activities.filter((item) => item.type === 'walk');

    const bestRun = findBestRunTime(runs);
    const longestRun = findLongestByDistanceOrDuration(runs);
    const longestWalk = findLongestByDistanceOrDuration(walks);

    this.performanceEl.append(
      buildPerfCard('Best run time', bestRun),
      buildPerfCard('Longest run', longestRun),
      buildPerfCard('Longest walk', longestWalk),
    );
  }

  renderChart(byType) {
    this.chartEl.replaceChildren();

    const title = document.createElement('h3');
    title.textContent = 'Activity mix';
    this.chartEl.append(title);

    if (byType.length === 0) {
      const empty = document.createElement('p');
      empty.textContent = 'No matching activities found.';
      this.chartEl.append(empty);
      return;
    }

    const max = Math.max(...byType.map((item) => item.count));
    const grid = document.createElement('div');
    grid.className = 'cards-grid';

    for (const item of byType) {
      const row = document.createElement('article');
      row.className = 'type-card';

      const label = document.createElement('p');
      label.append(
        createIconElement(item.type),
        document.createTextNode(` ${toLabel(item.type)} (${item.count})`),
      );

      const barTrack = document.createElement('div');
      barTrack.className = 'bar-track';

      const bar = document.createElement('div');
      bar.className = 'bar-fill';
      bar.style.width = `${Math.max(5, Math.round((item.count / max) * 100))}%`;

      barTrack.append(bar);
      row.append(label, barTrack);
      grid.append(row);
    }

    this.chartEl.append(grid);
  }

  renderList(activities) {
    this.listEl.replaceChildren();

    const title = document.createElement('h3');
    title.textContent =
      this.activePage === 'all' ? 'Recent activities' : `${toLabel(this.activePage)} timeline`;
    this.listEl.append(title);

    if (activities.length === 0) {
      const empty = document.createElement('p');
      empty.textContent = 'No activities in the selected date range.';
      this.listEl.append(empty);
      return;
    }

    const grid = document.createElement('div');
    grid.className = 'cards-grid';

    for (const activity of activities) {
      const card = document.createElement('article');
      card.className = 'type-card';

      const cardTitle = document.createElement('h4');
      cardTitle.append(
        createIconElement(activity.type),
        document.createTextNode(` ${toLabel(activity.type)} | ${activity.source}`),
      );

      const date = document.createElement('p');
      date.textContent = `Start: ${activity.startAt.slice(0, 19).replace('T', ' ')}`;

      const metrics = document.createElement('pre');
      metrics.className = 'preview';
      metrics.textContent = JSON.stringify(activity.metrics ?? {}, null, 2);

      card.append(cardTitle, date, metrics);
      grid.append(card);
    }

    this.listEl.append(grid);
  }
}

function toLabel(value) {
  return value
    .replace(/_/g, ' ')
    .split(' ')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function getActivityIconPath(type) {
  if (type === 'all') return 'M3 12L12 4l9 8M5 10v10h14V10';
  if (type === 'run') return 'M13 5a2 2 0 1 0 0.001 0zM7 21l3-6 3 2 2 4M9 10l3 2 3-1 3 2';
  if (type === 'walk') return 'M12 5a2 2 0 1 0 0.001 0zM10 21l1-5-2-3m5 8-1-6 2-3';
  if (type === 'sleep') return 'M4 7h8l-8 10h8M14 9h6l-6 8h6';
  if (type === 'heart_rate') return 'M3 12h4l2-4 3 8 2-4h7';
  if (type === 'steps')
    return 'M7 6c2 0 3 1 3 3s-1 3-3 3-3-1-3-3 1-3 3-3zm10 6c2 0 3 1 3 3s-1 3-3 3-3-1-3-3 1-3 3-3z';
  if (type === 'distance')
    return 'M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11zm0-8a3 3 0 1 0 0-6 3 3 0 0 0 0 6z';
  if (type === 'calories') return 'M12 3s5 4 5 9a5 5 0 1 1-10 0c0-3 2-6 5-9z';
  if (type === 'swim') return 'M3 17c2 0 2 2 4 2s2-2 4-2 2 2 4 2 2-2 4-2 2 2 4 2';
  if (type === 'yoga') return 'M12 6a2 2 0 1 0 0.001 0zM6 14h12M8 21l2-5m6 5-2-5';
  if (type === 'basketball') return 'M12 3a9 9 0 1 0 0 18M3 12h18M12 3a15 15 0 0 1 0 18';
  return 'M4 19h16M4 15h10M4 11h7M4 7h13';
}

function createIconElement(type) {
  const ns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns, 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('width', '16');
  svg.setAttribute('height', '16');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');
  svg.classList.add('icon');
  svg.setAttribute('aria-hidden', 'true');

  const path = document.createElementNS(ns, 'path');
  path.setAttribute('d', getActivityIconPath(type));
  svg.append(path);
  return svg;
}

function buildPerfCard(title, stat) {
  const card = document.createElement('article');
  card.className = 'type-card perf-card';

  const heading = document.createElement('h3');
  heading.textContent = title;

  const value = document.createElement('p');
  value.className = 'perf-value';
  value.textContent = stat?.value ?? 'No data';

  const note = document.createElement('p');
  note.textContent = stat?.note ?? 'Import run/walk data to see this metric.';

  card.append(heading, value, note);
  return card;
}

function findBestRunTime(runs) {
  const candidates = runs
    .map((run) => ({
      run,
      duration: getDurationMinutes(run),
    }))
    .filter((item) => item.duration && item.duration > 0)
    .sort((a, b) => a.duration - b.duration);

  const best = candidates[0];
  if (!best) return null;

  return {
    value: `${best.duration.toFixed(1)} min`,
    note: `Started ${best.run.startAt.slice(0, 10)}`,
  };
}

function findLongestByDistanceOrDuration(items) {
  const candidates = items.map((item) => ({
    item,
    distanceKm: getDistanceKm(item),
    duration: getDurationMinutes(item),
  }));

  const byDistance = candidates
    .filter((item) => item.distanceKm && item.distanceKm > 0)
    .sort((a, b) => b.distanceKm - a.distanceKm)[0];

  if (byDistance) {
    return {
      value: `${byDistance.distanceKm.toFixed(2)} km`,
      note: `Started ${byDistance.item.startAt.slice(0, 10)}`,
    };
  }

  const byDuration = candidates
    .filter((item) => item.duration && item.duration > 0)
    .sort((a, b) => b.duration - a.duration)[0];

  if (!byDuration) return null;

  return {
    value: `${byDuration.duration.toFixed(1)} min`,
    note: `Started ${byDuration.item.startAt.slice(0, 10)}`,
  };
}

function getDurationMinutes(activity) {
  if (!activity.endAt) return null;
  const start = new Date(activity.startAt).getTime();
  const end = new Date(activity.endAt).getTime();
  if (!Number.isFinite(start) || !Number.isFinite(end) || end <= start) return null;
  return (end - start) / 1000 / 60;
}

function getDistanceKm(activity) {
  const metrics = activity.metrics ?? {};
  const candidates = [
    metrics.DistanceMeters,
    metrics.distanceMeters,
    metrics.distance_m,
    metrics.distance,
    metrics.fpVal,
    metrics.intVal,
  ];

  for (const candidate of candidates) {
    const value = Number(candidate);
    if (!Number.isFinite(value) || value <= 0) continue;

    if (value > 1000) return value / 1000;
    if (value > 100) return value / 1000;
    return value;
  }

  return null;
}

async function parseActivitiesFromZip(zip, onProgress) {
  const entries = Object.values(zip.files).filter((entry) => !entry.dir);
  const activities = [];
  const total = entries.length;

  for (let idx = 0; idx < entries.length; idx += 1) {
    const entry = entries[idx];
    const lower = entry.name.toLowerCase();
    if (!(lower.endsWith('.json') || lower.endsWith('.csv') || lower.endsWith('.tcx'))) continue;
    if (onProgress && idx % 10 === 0) {
      onProgress(`Importing data... ${idx + 1}/${total} files scanned`);
      await yieldToUi();
    }

    const source = lower.includes('/fitbit/') ? 'Fitbit' : 'Google Fit';
    const inferredType = inferActivityType(entry.name);

    try {
      const content = await entry.async('string');

      if (lower.endsWith('.json'))
        activities.push(...parseJsonRecords(entry.name, source, inferredType, content));
      else if (lower.endsWith('.csv'))
        activities.push(...parseCsvRecords(entry.name, source, inferredType, content));
      else {
        const record = parseTcxRecord(entry.name, source, inferredType, content);
        if (record) activities.push(record);
      }
    } catch {
      // Ignore malformed files and keep importing the rest.
    }
  }

  return dedupeById(activities);
}

function yieldToUi() {
  return new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
}

function parseJsonRecords(path, source, type, content) {
  const parsed = JSON.parse(content);
  const points = Array.isArray(parsed?.point)
    ? parsed.point
    : Array.isArray(parsed)
      ? parsed
      : [parsed];

  const records = [];
  for (let index = 0; index < points.length; index += 1) {
    const point = points[index] ?? {};
    const startAt =
      fromNanos(point.startTimeNanos) ??
      fromMillis(point.modifiedTimeMillis) ??
      extractDateFromPath(path) ??
      new Date().toISOString();

    const endAt =
      fromNanos(point.endTimeNanos) ??
      fromMillis(point.rawTimestampMillis) ??
      fromMillis(point.modifiedTimeMillis);

    records.push({
      id: `${path}#${index}`,
      source,
      type,
      startAt,
      endAt: endAt ?? null,
      metrics: extractMetrics(point),
    });
  }

  return records;
}

function parseCsvRecords(path, source, type, content) {
  const lines = content
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
  if (lines.length < 2) return [];

  const headers = splitCsvLine(lines[0]);
  const dateIndex = headers.findIndex((header) => /date|time/i.test(header));
  const records = [];

  for (let index = 1; index < lines.length; index += 1) {
    const cols = splitCsvLine(lines[index]);
    const metrics = {};
    for (let i = 0; i < headers.length; i += 1) metrics[headers[i]] = cols[i] ?? '';

    const startAt =
      parseDate(cols[dateIndex]) ?? extractDateFromPath(path) ?? new Date().toISOString();

    records.push({
      id: `${path}#${index}`,
      source,
      type,
      startAt,
      endAt: null,
      metrics,
    });
  }

  return records;
}

function parseTcxRecord(path, source, type, content) {
  const match = content.match(/<Id>([^<]+)<\/Id>/);
  const startAt = parseDate(match?.[1]) ?? extractDateFromPath(path) ?? new Date().toISOString();
  const endAt = parseDate(content.match(/<Time>([^<]+)<\/Time>(?!.*<Time>)/)?.[1]);
  const totalSeconds = Number(
    content.match(/<TotalTimeSeconds>([^<]+)<\/TotalTimeSeconds>/)?.[1] ?? 0,
  );
  const distanceMeters = Number(
    content.match(/<DistanceMeters>([^<]+)<\/DistanceMeters>/)?.[1] ?? 0,
  );
  const trackpoints = (content.match(/<Trackpoint>/g) ?? []).length;

  return {
    id: `${path}#0`,
    source,
    type,
    startAt,
    endAt: endAt ?? null,
    metrics: {
      trackpoints,
      totalTimeSeconds: Number.isFinite(totalSeconds) ? totalSeconds : undefined,
      distanceMeters: Number.isFinite(distanceMeters) ? distanceMeters : undefined,
    },
  };
}

function extractMetrics(point) {
  const value = Array.isArray(point?.value) ? point.value[0] : point?.value;
  if (!value || typeof value !== 'object') return {};

  const metrics = {};
  for (const [key, val] of Object.entries(value)) {
    if (key.endsWith('Val') || typeof val === 'number' || typeof val === 'string')
      metrics[key] = val;
  }
  return metrics;
}

function inferActivityType(path) {
  const lower = path.toLowerCase();

  if (lower.includes('running') || lower.includes('run')) return 'run';
  if (lower.includes('walking') || lower.includes('walk')) return 'walk';
  if (lower.includes('basketball')) return 'basketball';
  if (lower.includes('swimming') || lower.includes('swim')) return 'swim';
  if (lower.includes('yoga')) return 'yoga';
  if (lower.includes('sleep')) return 'sleep';
  if (lower.includes('heart_rate') || lower.includes('heart rate')) return 'heart_rate';
  if (lower.includes('step_count') || lower.includes('steps')) return 'steps';
  if (lower.includes('distance')) return 'distance';
  if (lower.includes('calories')) return 'calories';

  const file = path.split('/').pop() ?? path;
  return file
    .replace(/\(\d+\)/g, '')
    .replace(/\.[^.]+$/, '')
    .replace(/^derived_/, '')
    .replace(/^raw_/, '')
    .replace(/_/g, ' ')
    .trim();
}

function splitCsvLine(line) {
  const out = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }

    if (char === ',' && !inQuotes) {
      out.push(current);
      current = '';
      continue;
    }

    current += char;
  }

  out.push(current);
  return out;
}

function parseDate(value) {
  if (!value) return null;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed.toISOString();
}

function extractDateFromPath(path) {
  const match = path.match(/(\d{4}-\d{2}-\d{2})/);
  if (!match) return null;
  return parseDate(match[1]);
}

function fromNanos(value) {
  if (!value) return null;
  const asNumber = Number(value);
  if (!Number.isFinite(asNumber)) return null;
  return new Date(Math.floor(asNumber / 1_000_000)).toISOString();
}

function fromMillis(value) {
  if (!value) return null;
  const asNumber = Number(value);
  if (!Number.isFinite(asNumber)) return null;
  return new Date(asNumber).toISOString();
}

function dedupeById(items) {
  const byId = new Map();
  for (const item of items) byId.set(item.id, item);
  return Array.from(byId.values());
}

customElements.define('local-first-app', LocalFirstApp);
