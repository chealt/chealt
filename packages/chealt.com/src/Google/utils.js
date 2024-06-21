const authUrl = import.meta.env.VITE_GOOGLE_AUTH_URL;
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const redirectUri = import.meta.env.VITE_GOOGLE_REDIRECT_URI;
const profileAPIUrl = import.meta.env.VITE_GOOGLE_PROFILE_API_URL;

const getAuthUrl = () =>
  `${authUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=https://www.googleapis.com/auth/fitness.location.read%20https://www.googleapis.com/auth/fitness.sleep.read%20https://www.googleapis.com/auth/userinfo.profile`;

const tokensKey = 'GOOGLE_TOKENS';
const storeTokens = (tokens) => {
  if (tokens) {
    localStorage.setItem(tokensKey, JSON.stringify(tokens));
  }
};
const retrieveTokens = () => {
  const storedTokens = localStorage.getItem(tokensKey);

  try {
    return JSON.parse(storedTokens);
  } catch {
    return undefined;
  }
};
const clearTokens = () => {
  localStorage.removeItem(tokensKey);
};

const parseUrlHash = () => {
  const hash = {};
  const searchParams = new URLSearchParams(window.location.hash.slice(1));

  for (const key of searchParams.keys()) {
    hash[key] = searchParams.get(key);
  }

  return hash;
};

const getProfile = async ({ accessToken }) =>
  fetch(`${profileAPIUrl}/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

export { getAuthUrl, storeTokens, retrieveTokens, clearTokens, parseUrlHash, getProfile };
