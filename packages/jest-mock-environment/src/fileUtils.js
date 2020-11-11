const path = require('path');
const fs = require('fs');
const { promisify } = require('util');

const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);

const writeFileSafe = async (filepath, content) => {
  const dirname = path.dirname(filepath);
  await mkdir(dirname, { recursive: true });

  return writeFile(filepath, content);
};

module.exports = {
  writeFileSafe
};
