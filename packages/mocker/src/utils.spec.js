import { findMocksForUrl } from './utils';

describe('utils module', () => {
  describe('findMocksForUrl()', () => {
    it('returns mock with matching URL and method', () => {
      // GIVEN
      const mockUrl = 'http://localhost:3000/mock/url';
      const matchingMock = {
        url: mockUrl,
        method: 'GET'
      };
      const mocks = {
        [mockUrl]: [matchingMock]
      };

      // WHEN
      const findMocks = findMocksForUrl({});

      // THEN
      expect(findMocks({ mocks, url: mockUrl, method: 'GET' })).toEqual([matchingMock]);
    });

    it('returns mock with matching URL, method and header', () => {
      // GIVEN
      const mockUrl = 'http://localhost:3000/mock/url';
      const matchingMock = {
        url: mockUrl,
        method: 'GET',
        headers: {
          header1: 'header1'
        }
      };
      const mocks = {
        [mockUrl]: [matchingMock]
      };

      // WHEN
      const findMocks = findMocksForUrl({});

      // THEN
      expect(
        findMocks({ mocks, url: mockUrl, method: 'GET', headers: { header1: 'header1', extraHeader: 'extraHeader' } })
      ).toEqual([matchingMock]);
    });
  });
});
