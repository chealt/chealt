const authUrl = import.meta.env.GOOGLE_AUTH_URL;
const clientId = import.meta.env.GOOGLE_CLIENT_ID;
const redirectUri = import.meta.env.GOOGLE_REDIRECT_URI;
const profileAPIUrl = import.meta.env.GOOGLE_PROFILE_API_URL;
const driveAPIUrl = import.meta.env.GOOGLE_DRIVE_API_URL;
const driveUploadAPIUrl = import.meta.env.GOOGLE_DRIVE_UPLOAD_API_URL;

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

  if (!tokens?.scope) {
    return false;
  }

  return !scopes.some((scope) => !tokens.scope.includes(`${scopeUrl}/${scope}`));
};

const boundaryString = 'chealt';
const metaFileName = 'chealt.json';
const createMultipartBody = ({ data, fileId }) => {
  // https://developers.google.com/drive/v3/web/multipart-upload defines the structure
  const metaData = {
    name: metaFileName,
    description: 'Chealt App backup data',
    mimeType: 'application/json',
    fields: 'id',
    parents: !fileId ? ['appDataFolder'] : undefined
  };

  // request body
  const multipartBody =
    `\r\n--${boundaryString}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify(metaData)}\r\n--${boundaryString}\r\nContent-Type: application/json\r\n\r\n` +
    `${JSON.stringify(data)}\r\n` +
    `--${boundaryString}--`;

  return multipartBody;
};

const uploadDriveMetaData = async ({ accessToken, data, fileId }) =>
  fetch(`${driveUploadAPIUrl}/files${fileId ? `/${fileId}` : ''}?uploadType=multipart`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': `multipart/related; boundary=${boundaryString}`,
      'Content-Length': JSON.stringify(data).length
    },
    method: fileId ? 'PATCH' : 'POST',
    body: createMultipartBody({ data, fileId })
  });

const getFile = ({ accessToken, fileId, fileName }) => {
  const params = `q=${encodeURIComponent(`name = '${fileName || metaFileName}' and 'appDataFolder' in parents`)}&spaces=appDataFolder`;

  return fetch(`${driveAPIUrl}/files${fileId ? `/${fileId}` : `?${params}`}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
};

const downloadFile = ({ accessToken, fileId }) =>
  fetch(`${driveAPIUrl}/files/${fileId}?alt=media`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

const hasScopeAccess = (scopeToCheck, tokens) =>
  tokens?.scope.some((scope) => scope === `${scopeUrl}/${scopeToCheck}`);

export {
  getAuthUrl,
  storeTokens,
  retrieveTokens,
  clearTokens,
  parseUrlHash,
  getProfile,
  allScopesAllowed,
  uploadDriveMetaData,
  hasScopeAccess,
  getFile,
  downloadFile
};
