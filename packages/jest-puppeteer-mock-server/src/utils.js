import path from 'path';

const getFolderAbsPath = (folder) => path.join(process.cwd(), folder);

export { getFolderAbsPath };
