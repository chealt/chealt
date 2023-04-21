import { test as baseTest } from '@playwright/test';
import { locatorFixtures as fixtures } from '@playwright-testing-library/test/fixture.js';

const test = baseTest.extend(fixtures);
const { expect } = test;

export { test, expect };
