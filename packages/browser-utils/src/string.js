const base64UrlEncode = (str) =>
  btoa(String.fromCharCode.apply(null, new Uint8Array(str)))
    .replace(/\+/gu, '-')
    .replace(/\//gu, '_')
    .replace(/=+$/u, '');

export { base64UrlEncode };
