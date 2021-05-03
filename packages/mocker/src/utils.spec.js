import { findMocksForUrl } from './utils';

describe('utils module', () => {
  describe('findMocksForUrl()', () => {
    it('returns mock with matching URL and method', () => {
      // GIVEN
      const mockUrl = 'http://localhost:3000/mock/url';
      const matchingMock = {
        url: mockUrl,
        method: 'method'
      };
      const mocks = {
        [mockUrl]: [matchingMock]
      };

      // WHEN
      const findMocks = findMocksForUrl({});

      // THEN
      expect(findMocks({ mocks, url: mockUrl, method: 'method' })).toEqual([matchingMock]);
    });

    it('returns mock with matching URL, method and header', () => {
      // GIVEN
      const mockUrl = 'http://localhost:3000/mock/url';
      const matchingMock = {
        url: mockUrl,
        method: 'method',
        requestHeaders: {
          requestHeader1: 'requestHeader1'
        },
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
        findMocks({
          mocks,
          url: mockUrl,
          method: 'method',
          headers: { requestHeader1: 'requestHeader1', extraHeader: 'extraHeader' }
        })
      ).toEqual([matchingMock]);
    });

    it('returns mock with matching URL, method and request body', () => {
      // GIVEN
      const mockUrl = 'http://localhost:3000/mock/url';
      const matchingMock = {
        url: mockUrl,
        method: 'method',
        requestBody: {
          data: '123'
        }
      };
      const mocks = {
        [mockUrl]: [matchingMock]
      };

      // WHEN
      const findMocks = findMocksForUrl({});

      // THEN
      expect(
        findMocks({
          mocks,
          url: mockUrl,
          method: 'method',
          requestBody: {
            data: '123'
          }
        })
      ).toEqual([matchingMock]);
    });

    it('returns mock with matching regular expression URL', () => {
      // GIVEN
      const mockUrl = '/mockery\\.com/mock/.*/url/.*/';
      const matchingMock = {
        url: mockUrl,
        method: 'method'
      };
      const mocks = {
        [mockUrl]: [matchingMock]
      };

      // WHEN
      const findMocks = findMocksForUrl({});

      // THEN
      expect(
        findMocks({
          mocks,
          url: 'http://mockery.com/mock/123/url/asd',
          method: 'method'
        })
      ).toEqual([matchingMock]);
    });
  });
});
