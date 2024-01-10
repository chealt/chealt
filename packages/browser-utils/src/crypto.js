import { base64UrlEncode } from './string';

const dec2hex = (dec) => `0${dec.toString(16)}`.slice(-2);

const generateRandomString = () => {
  const array = new Uint32Array(56 / 2);
  window.crypto.getRandomValues(array);

  return Array.from(array, dec2hex).join('');
};

const sha256 = async (plain) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);

  return await window.crypto.subtle.digest('SHA-256', data);
};

const getOAuthChallenge = async () => {
  const verifier = generateRandomString();
  const encodedString = await sha256(verifier);

  return {
    verifier,
    challenge: base64UrlEncode(encodedString)
  };
};

export { getOAuthChallenge };
