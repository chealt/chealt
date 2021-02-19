const removePort = (url) => url.replace(/:\d\d\d\d[\d]*/gu, '');
const removeHost = (url) => url.replace(/https?:\/\/[^/]*/gu, '');

const findMocksForUrl = ({ isPortAgnostic, isHostAgnostic }) => (mocks, url) => {
  const mockKey = Object.keys(mocks).find((responseUrl) => {
    if (isPortAgnostic) {
      return removePort(responseUrl) === removePort(url);
    }

    if (isHostAgnostic) {
      return removeHost(responseUrl) === removeHost(url);
    }

    return responseUrl === url;
  });

  if (mockKey) {
    return mocks[mockKey];
  }

  return undefined;
};

module.exports = {
  findMocksForUrl
};
