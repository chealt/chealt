const authTokenUrl = import.meta.env.FITBIT_AUTH_TOKEN_URL;
const authUrl = import.meta.env.FITBIT_AUTH_URL;
const clientId = import.meta.env.FITBIT_CLIENT_ID;
const redirectUri = import.meta.env.FITBIT_REDIRECT_URI;
const apiUrl = import.meta.env.FITBIT_API_URL;

const getAuthUrl = (challenge) =>
  `${authUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&code_challenge=${challenge}&code_challenge_method=S256&scope=activity%20heartrate%20location%20nutrition%20oxygen_saturation%20profile%20respiratory_rate%20settings%20sleep%20social%20temperature%20weight`;

const getAuthTokens = async ({ code, verifier }) => {
  const params = new URLSearchParams();
  params.append('client_id', clientId);
  params.append('grant_type', 'authorization_code');
  params.append('code', code);
  params.append('code_verifier', verifier);
  params.append('redirect_uri', redirectUri);

  return fetch(authTokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: params
  });
};

const verifierKey = 'FITBIT_VERIFIER';
const storeVerifier = (verifier) => {
  if (verifier) {
    sessionStorage.setItem(verifierKey, verifier);
  }
};

const retrieveVerifier = () => sessionStorage.getItem(verifierKey);

const clearVerifier = () => {
  sessionStorage.removeItem(verifierKey);
};

const tokensKey = 'FITBIT_TOKENS';
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

const getProfile = async ({ accessToken }) =>
  fetch(`${apiUrl}/1/user/-/profile.json`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

export {
  getAuthUrl,
  getAuthTokens,
  storeVerifier,
  retrieveVerifier,
  clearVerifier,
  retrieveTokens,
  storeTokens,
  clearTokens,
  getProfile
};
