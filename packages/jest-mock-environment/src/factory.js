const getMockResponse = ({
  mocks,
  runningTestName,
  requestDetails: { url, method }
}) => {
  const testMocks = mocks && mocks[runningTestName];
  const testMocksForUrl = testMocks && testMocks[url];
  const hasMockResponses = testMocksForUrl && testMocksForUrl.length;
  const mockResponseIndex =
        hasMockResponses &&
        testMocksForUrl.findIndex((mock) => mock.method === method);
  const mockResponse =
        hasMockResponses && mockResponseIndex !== -1
          ? testMocksForUrl.splice(mockResponseIndex, 1)[0] // we remove the element from the array
          : undefined;

  return mockResponse;
};

const factory = async ({ config: configParam, page, mocks, logger } = {}) => {
  let runningTestName;
  const config = {
    dataRequestResourceTypes: ["fetch", "xhr"],
    notInterceptedUrls: ["browser-sync"],
    ...configParam
  };
  const responses = {};
  const getResponseDetails = async (response, url) => {
    let body;
    let json;
    const status = response.status();
    const statusText = response.statusText();
    const headers = response.headers();

    try {
      json = await response.json();
    } catch {
      // sometimes the response is no longer available when we try to parse it
      // this might be a bug in puppeteer, therefore we don't do anything
      logger.debug(`Could not parse response for url: ${url}`);

      return undefined;
    }

    if (json) {
      body = json;
    } else {
      body = await response.text();
    }

    return {
      headers,
      status,
      statusText,
      body,
      json
    };
  };

  const interceptRequest = async (request) => {
    const { dataRequestResourceTypes, notInterceptedUrls } = config;
    const requestResourceType = request.resourceType();
    const isDataRequest = dataRequestResourceTypes.includes(
      requestResourceType
    );
    const url = request.url();
    const shouldInterceptUrl = !notInterceptedUrls.some(
      (notInterceptedUrl) => url.includes(notInterceptedUrl)
    );
    const headers = request.headers();
    const isJSON = headers && headers.accept === "application/json";
    const method = request.method();
    const shouldInterceptRequest =
            shouldInterceptUrl && isDataRequest && isJSON;
    const requestDetails = {
      url,
      headers,
      method,
      isJSON
    };

    if (shouldInterceptRequest) {
      const mockResponse = getMockResponse({
        mocks,
        runningTestName,
        requestDetails
      });

      if (mockResponse) {
        logger.debug(
          `Responding with mock: ${JSON.stringify(
            mockResponse.body
          )}, for url: ${url}`
        );
        await request.respond({
          status: mockResponse.status,
          headers: mockResponse.headers,
          body: JSON.stringify(mockResponse.body)
        });

        return;
      }

      if (!responses[runningTestName]) {
        responses[runningTestName] = {};
      }

      responses[runningTestName][url] = [];

      const response = request.response();

      if (response) {
        const details = await getResponseDetails(response);

        if (details) {
          responses[runningTestName][url].push({
            url,
            method,
            ...details
          });
        }
      }
    }

    request.continue();
  };

  const saveResponse = async (response) => {
    const url = response.url();
    const originalRequest =
            responses[runningTestName] && responses[runningTestName][url];

    if (originalRequest) {
      const details = await getResponseDetails(response, url);
      const request = response.request();
      const method = request.method();

      if (details) {
        originalRequest.push({
          url,
          method,
          ...details
        });
      }
    }
  };

  const setTestName = (testName) => {
    runningTestName = testName;
  };

  const getResponses = () => responses;

  const init = async () => {
    await page.setRequestInterception(true);
    page.on("request", interceptRequest);
    page.on("response", saveResponse);
  };

  await init();

  return {
    getResponses,
    setTestName
  };
};

module.exports = factory;
