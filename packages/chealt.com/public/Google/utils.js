import { encrypt } from '../Crypto/utils';

const authUrl = import.meta.env.GOOGLE_AUTH_URL;
const clientId = import.meta.env.GOOGLE_CLIENT_ID;
const redirectUri = import.meta.env.GOOGLE_REDIRECT_URI;
const profileAPIUrl = import.meta.env.GOOGLE_PROFILE_API_URL;
const driveAPIUrl = import.meta.env.GOOGLE_DRIVE_API_URL;
const driveUploadAPIUrl = import.meta.env.GOOGLE_DRIVE_UPLOAD_API_URL;

const mimeTypes = {
  pdf: 'application/pdf',
  jpeg: 'image/jpeg',
  jpg: 'image/jpeg',
  webp: 'image/webp'
};

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
const createMultipartBody = ({ name, data, fileId, mimeType }) => {
  // https://developers.google.com/drive/v3/web/multipart-upload defines the structure
  const metaData = {
    name: name || metaFileName,
    description: 'Chealt App backup data',
    mimeType: mimeType || 'application/json',
    fields: 'id',
    parents: !fileId ? ['appDataFolder'] : undefined
  };

  // request body
  const multipartBody =
    `\r\n--${boundaryString}\r\nContent-Type: ${mimeType}; charset=UTF-8\r\n\r\n${JSON.stringify(metaData)}\r\n--${boundaryString}\r\nContent-Type: ${mimeType}\r\n\r\n` +
    `${data}\r\n` +
    `--${boundaryString}--`;

  return multipartBody;
};

const fileToBase64 = (blob) =>
  new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result.replace('data:', '').replace(/^.+,/u, ''));
    };
    reader.readAsDataURL(blob);
  });

// eslint-disable-next-line complexity
const uploadDriveData = async ({
  accessToken,
  data: { bloodType, documents, personalDetails, profiles, vaccinations, familyHistory },
  fileId,
  password,
  encryptData
}) => {
  // strip out the blob, we will upload it separately
  const documentsMetaOnly = documents ? [] : undefined;

  if (documents) {
    for (const {
      key,
      value: { blob, ...rest }
    } of documents) {
      const body = encryptData ? await encrypt({ secretData: blob, password, isFile: true }) : blob;
      const data = await fileToBase64(new Blob([body]));

      // Upload file first
      const fileUploadResponse = await fetch(
        `${driveUploadAPIUrl}/files${rest.googleDriveFileId ? `/${rest.googleDriveFileId}?uploadType=media` : `?uploadType=multipart`}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': `multipart/related; boundary=${boundaryString}`
          },
          method: rest.googleDriveFileId ? 'PATCH' : 'POST',
          body: createMultipartBody({
            name: rest.name,
            data,
            fileId: rest.googleDriveFileId,
            mimeType: mimeTypes[rest.name.slice(rest.name)]
          })
        }
      );

      if (!fileUploadResponse.ok) {
        throw new Error(fileUploadResponse.message);
      }

      console.log(await fileUploadResponse.json());

      debugger;

      // Add meta data of the file to the details upload
      documentsMetaOnly.push({
        key,
        value: rest
      });
    }
  }

  const dataStr = JSON.stringify({
    bloodType,
    personalDetails,
    profiles,
    documents: documentsMetaOnly,
    familyHistory,
    vaccinations
  });
  const encryptedData = encryptData ? await encrypt({ secretData: dataStr, password }) : undefined;

  return fetch(`${driveUploadAPIUrl}/files${fileId ? `/${fileId}` : ''}?uploadType=multipart`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': `multipart/related; boundary=${boundaryString}`,
      'Content-Length': JSON.stringify(encryptedData).length
    },
    method: fileId ? 'PATCH' : 'POST',
    body: createMultipartBody({ data: JSON.stringify(encryptedData), fileId })
  });
};

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
  uploadDriveData,
  hasScopeAccess,
  getFile,
  downloadFile
};
