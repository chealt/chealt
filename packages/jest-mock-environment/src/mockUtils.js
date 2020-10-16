const removePort = (url) => url.replace(/:\d\d\d\d[\d]*/gu, '');

const findMocksForUrl = ({ isPortAgnostic }) => (mocks, url) => {
  const mockKey = Object.keys(mocks).find(
    (responseUrl) => (!isPortAgnostic ? responseUrl === url : removePort(responseUrl) === removePort(url))
  );

  if (mockKey) {
    return mocks[mockKey];
  }

  return undefined;
};

module.exports = {
  findMocksForUrl
};
