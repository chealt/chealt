const authUrl = import.meta.env.GOOGLE_AUTH_URL;
const clientId = import.meta.env.GOOGLE_CLIENT_ID;
const redirectUri = import.meta.env.GOOGLE_REDIRECT_URI;
const profileAPIUrl = import.meta.env.GOOGLE_PROFILE_API_URL;

const scopeUrl = 'https://www.googleapis.com/auth';

const getAuthUrl = ({ scopes } = {}) =>
  `${authUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=${(
    scopes || []
  )
    .concat('userinfo.profile') // always add this scope for user information
    .map((scope) => `${scopeUrl}/${scope}`)
    .join('%20')}`;

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

const allScopesAllowed = (scopes) => {
  const tokens = retrieveTokens();

  return !scopes.some((scope) => !tokens.scope.includes(`${scopeUrl}/${scope}`));
};

export {
  getAuthUrl,
  storeTokens,
  retrieveTokens,
  clearTokens,
  parseUrlHash,
  getProfile,
  allScopesAllowed
};
