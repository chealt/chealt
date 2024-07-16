const mockClientSide = () => {
  // eslint-disable-next-line no-undef
  globalThis.localStorage = {
    getItem: () => null
  };
  // eslint-disable-next-line no-undef
  globalThis.sessionStorage = {
    getItem: () => null,
    removeItem: () => null
  };
  // eslint-disable-next-line no-undef
  globalThis.window = {
    location: {
      hash: ''
    }
  };
};

export { mockClientSide };
