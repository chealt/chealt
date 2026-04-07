import { listEntries, saveEntry } from '../lib/db';
import { syncDirtyEntries } from '../lib/sync';

class LocalFirstApp extends HTMLElement {
  connectedCallback() {
    this.render();
    this.bind();
    void this.refresh();
  }

  render() {
    const section = document.createElement('section');

    const heading = document.createElement('h2');
    heading.textContent = 'Local-first notes';

    const description = document.createElement('p');
    description.textContent =
      'Writes go to IndexedDB first, then sync in background to Turso via Worker.';

    const form = document.createElement('form');
    form.id = 'note-form';

    const input = document.createElement('input');
    input.id = 'note-input';
    input.name = 'title';
    input.placeholder = 'Write a note';
    input.required = true;

    const saveButton = document.createElement('button');
    saveButton.type = 'submit';
    saveButton.textContent = 'Save local';

    const syncButton = document.createElement('button');
    syncButton.type = 'button';
    syncButton.id = 'sync-button';
    syncButton.textContent = 'Sync now';

    const status = document.createElement('p');
    status.id = 'status';
    status.textContent = 'Ready.';

    const notes = document.createElement('ul');
    notes.id = 'notes';

    form.append(input, saveButton, syncButton);
    section.append(heading, description, form, status, notes);
    this.replaceChildren(section);

    this.statusEl = this.querySelector('#status');
    this.listEl = this.querySelector('#notes');
    this.inputEl = this.querySelector('#note-input');
  }

  bind() {
    const form = this.querySelector('#note-form');
    const syncButton = this.querySelector('#sync-button');

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const title = this.inputEl.value.trim();
      if (!title) return;

      await saveEntry(title);
      this.inputEl.value = '';
      this.statusEl.textContent = 'Saved locally.';
      await this.refresh();
      void this.runSync();
    });

    syncButton.addEventListener('click', () => {
      void this.runSync();
    });
  }

  async runSync() {
    this.statusEl.textContent = 'Syncing...';
    try {
      const synced = await syncDirtyEntries();
      this.statusEl.textContent =
        synced > 0 ? `Synced ${synced} item(s).` : 'No dirty items to sync.';
      await this.refresh();
    } catch (error) {
      this.statusEl.textContent = `Sync failed: ${error.message}`;
    }
  }

  async refresh() {
    const entries = await listEntries();
    this.listEl.replaceChildren();

    for (const entry of entries) {
      const item = document.createElement('li');
      item.append(document.createTextNode(`${entry.title} `));

      const status = document.createElement('small');
      status.textContent = entry.dirty ? '(pending sync)' : '(synced)';
      item.append(status);

      this.listEl.append(item);
    }
  }
}

customElements.define('local-first-app', LocalFirstApp);
