import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import JSZip from 'jszip';
import { writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

async function createFixtureZip() {
  const zip = new JSZip();

  zip.file(
    'Takeout/Fit/All Data/derived_com.google.step_count.delta_com.google(1).json',
    JSON.stringify({
      point: [
        {
          startTimeNanos: '1704067200000000000',
          value: [{ intVal: 2000 }],
        },
      ],
    }),
  );

  zip.file(
    'Takeout/Fit/Activities/2015-01-04T17_00_00+01_00_PT30M_Running.tcx',
    '<TrainingCenterDatabase><Activities><Activity><Id>2015-01-04T16:00:00Z</Id><Lap><Track><Trackpoint></Trackpoint></Track></Lap></Activity></Activities></TrainingCenterDatabase>',
  );

  zip.file(
    'Takeout/Fitbit/Sleep Score/sleep_score.csv',
    'date,overall_score\n2025-06-20,82\n2025-06-21,79\n',
  );

  const buffer = await zip.generateAsync({ type: 'nodebuffer' });
  const filePath = path.join(os.tmpdir(), `chealt-upload-fixture-${Date.now()}.zip`);
  await writeFile(filePath, buffer);
  return filePath;
}

test('imports zip into indexeddb and renders searchable activity data', async ({ page }) => {
  const fixturePath = await createFixtureZip();

  await page.goto('/');

  await page.getByLabel('Health export ZIP').setInputFiles(fixturePath);

  await expect(page.getByRole('status')).toContainText(/Imported|Synced|Pending/);
  await expect(page.getByRole('heading', { name: 'Overview' })).toBeVisible();
  await expect(page.getByText('Total records in current view: 4')).toBeVisible();

  await page.getByRole('button', { name: 'Runs' }).click();

  await expect(page.getByText('Total records in current view: 1')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'run | Google Fit' })).toBeVisible();
});

test('homepage has no critical accessibility violations', async ({ page }) => {
  await page.goto('/');

  const accessibilityScanResults = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa'])
    .analyze();

  expect(accessibilityScanResults.violations).toEqual([]);
});
