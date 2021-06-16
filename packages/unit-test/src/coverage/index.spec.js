import { uploadCoverage } from '.';

describe('coverage module', () => {
  describe('uploadCoverage()', () => {
    it('uploads coverage folder to IBM Cloud', () => {
      const result = uploadCoverage({ cloudProviderConfig: { provider: 'IBM' }, git: {} });

      expect(result).toBeTruthy();
    });

    it('should throw when cloud provider is unknown', () => {
      expect(() => uploadCoverage({ cloudProviderConfig: {}, git: {} })).toThrow();
    });

    it('should throw when cloud provider config is not provided', () => {
      expect(() => uploadCoverage({ git: {} })).toThrow();
    });
  });
});
