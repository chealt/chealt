const bufferToBase64 = (buffer) =>
  btoa(new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), ''));

const base64ToBuffer = (base64String) =>
  Uint8Array.from(atob(base64String), (c) => c.charCodeAt(null));

const enc = new TextEncoder();
const dec = new TextDecoder();

const getPasswordKey = (password) =>
  crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveKey']);

const deriveKey = ({ passwordKey, salt, keyUsage }) =>
  crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: 250000,
      hash: 'SHA-256'
    },
    passwordKey,
    { name: 'AES-GCM', length: 256 },
    false,
    keyUsage
  );

const encrypt = async ({ secretData, password }) => {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const passwordKey = await getPasswordKey(password);
  const aesKey = await deriveKey({ passwordKey, salt, keyUsage: ['encrypt'] });
  const encryptedContent = await crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv
    },
    aesKey,
    enc.encode(secretData)
  );

  const encryptedContentArr = new Uint8Array(encryptedContent);
  const buff = new Uint8Array(salt.byteLength + iv.byteLength + encryptedContentArr.byteLength);
  buff.set(salt, 0);
  buff.set(iv, salt.byteLength);
  buff.set(encryptedContentArr, salt.byteLength + iv.byteLength);
  const base64Buff = bufferToBase64(buff);

  return base64Buff;
};

const decrypt = async ({ encryptedData, password }) => {
  const encryptedDataBuff = base64ToBuffer(encryptedData);
  const salt = encryptedDataBuff.slice(0, 16);
  const iv = encryptedDataBuff.slice(16, 16 + 12);
  const data = encryptedDataBuff.slice(16 + 12);
  const passwordKey = await getPasswordKey(password);
  const aesKey = await deriveKey({ passwordKey, salt, keyUsage: ['decrypt'] });
  const decryptedContent = await crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv
    },
    aesKey,
    data
  );

  return dec.decode(decryptedContent);
};

export { encrypt, decrypt };
