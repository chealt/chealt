import { getCoverageSummary, uploadCoverage } from '.';

describe('coverage module', () => {
  describe('uploadCoverage()', () => {
    it('uploads coverage folder to IBM Cloud', async () => {
      const result = await uploadCoverage({
        cloudProviderConfig: {
          provider: 'IBM',
          bucket: 'bucket',
          endpoint: 'endpoint',
          apiKeyId: 'apiKeyId',
          serviceInstanceId: 'serviceInstanceId'
        },
        coverageFolder: 'coverage/**/*.*',
        git: {
          org: 'org',
          repo: 'repo',
          branch: 'branch',
          hash: 'hash'
        }
      });

      expect(result).toBeTruthy();
    });

    it('should throw when cloud provider is unknown', async () => {
      await expect(uploadCoverage({ cloudProviderConfig: {}, git: {} })).rejects.toThrow();
    });

    it('should throw when cloud provider config is not provided', async () => {
      await expect(uploadCoverage({ git: {} })).rejects.toThrow();
    });

    it('should throw when IBM config is invalid', async () => {
      await expect(
        uploadCoverage({
          cloudProviderConfig: {},
          git: {}
        })
      ).rejects.toThrow();
    });

    it('should throw when Git details are invalid', async () => {
      await expect(
        uploadCoverage({
          cloudProviderConfig: {
            provider: 'IBM',
            bucket: 'bucket',
            endpoint: 'endpoint',
            apiKeyId: 'apiKeyId',
            serviceInstanceId: 'serviceInstanceId'
          },
          git: {}
        })
      ).rejects.toThrow();
    });
  });

  describe('getCoverageSummary()', () => {
    it('gets coverage summary', async () => {
      const coverageSummary = await getCoverageSummary({
        cloudProviderConfig: {
          provider: 'IBM',
          bucket: 'bucket',
          endpoint: 'endpoint',
          apiKeyId: 'apiKeyId',
          serviceInstanceId: 'serviceInstanceId'
        },
        git: {
          org: 'org',
          repo: 'repo',
          branch: 'branch',
          hash: 'hash'
        }
      });

      expect(coverageSummary).toEqual(Buffer.from([]));
    });
  });
});
