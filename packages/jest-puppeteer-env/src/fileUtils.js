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

  return writeFile(filepath, content);
};

module.exports = {
  createDir,
  writeFileSafe
};
