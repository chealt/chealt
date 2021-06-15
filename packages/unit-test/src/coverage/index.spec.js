import { uploadCoverage } from '.';

describe('coverage module', () => {
  describe('uploadCoverage()', () => {
    it('uploads coverage folder to IBM Cloud', () => {
      const result = uploadCoverage({ git: {} });

      expect(result).toBeTruthy();
    });
  });
});
