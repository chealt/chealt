import path from 'path';
import glob from 'glob';
import { promisify } from 'util';

const globAsync = promisify(glob);

const getFolderAbsPath = (folder) => path.join(process.cwd(), folder);

const getMocks = ({ folder, extension }) => globAsync(`${folder}/**/*.${extension}`);

export { getFolderAbsPath, getMocks };
