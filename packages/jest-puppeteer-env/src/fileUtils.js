const path = require('path');
const fs = require('fs');
const { promisify } = require('util');

const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);

const createDir = (filepath) => {
  const dirname = path.dirname(filepath);

  return mkdir(dirname, { recursive: true });
};

const writeFileSafe = async (filepath, content) => {
  await createDir(filepath);
  const dirname = path.dirname(filepath);
  await mkdir(dirname, { recursive: true });

  return writeFile(filepath, content);
};

module.exports = {
  createDir,
  writeFileSafe
};
