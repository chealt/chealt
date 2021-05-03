import { findMocksForUrl } from './utils';

describe('utils module', () => {
  describe('findMocksForUrl()', () => {
    const mockUrl = 'http://localhost:3000/mock/url';
    const matchingMock = {
      url: mockUrl,
      method: 'GET'
    };
    const mocks = {
      [mockUrl]: [matchingMock]
    };

    it('should work', () => {
      const findMocks = findMocksForUrl({});

      expect(findMocks({ mocks, url: mockUrl, method: 'GET' })).toEqual([matchingMock]);
    });
  });
});
