import globAsync from 'glob';

import {
  validateConfig as validateIBMConfig,
  uploadFiles as uploadIBMFiles,
  getCoverageSummary as getIBMCoverageSummary
} from './IBM/index.js';
import { promisify } from 'util';

const glob = promisify(globAsync);

const getProviderMethods = (config) => {
  if (!config) {
    throw new Error('Please provide a cloud provider config!');
  }

  switch (config.provider) {
    case 'IBM':
      return {
        validateConfig: validateIBMConfig,
        uploadFiles: uploadIBMFiles,
        getCoverage: getIBMCoverageSummary
      };
    default:
      throw new Error(`Unknown cloud provider: "${config.provider}"!`);
  }
};

const getFiles = (folder) => {
  try {
    return glob(folder);
  } catch (error) {
    console.error(error); // eslint-disable-line no-console

    throw new Error('Cannot read coverage files!');
  }
};

const validateGitConfig = ({ org, repo, branch, hash }) => {
  if (!org) {
    throw new Error('Git `org` must be provided!');
  }

  if (!repo) {
    throw new Error('Git `repo` must be provided!');
  }

  if (!branch) {
    throw new Error('Git `branch` must be provided!');
  }

  if (!hash) {
    throw new Error('Git `hash` must be provided!');
  }
};

const uploadCoverage = async ({ cloudProviderConfig, coverageFolder, git } = {}) => {
  const { validateConfig, uploadFiles } = getProviderMethods(cloudProviderConfig);
  validateConfig(cloudProviderConfig);

  validateGitConfig(git);
  const files = await getFiles(coverageFolder);

  await uploadFiles({ config: cloudProviderConfig, files, git });

  return true;
};

const getCoverageSummary = ({ cloudProviderConfig, git }) => {
  const { validateConfig, getCoverage } = getProviderMethods(cloudProviderConfig);
  validateConfig(cloudProviderConfig);

  validateGitConfig(git);

  return getCoverage({ config: cloudProviderConfig, git, file: 'coverage/coverage-summary.json' });
};

const calculateCoverageAvg = ({ lines, statements, functions, branches }) =>
  (lines.pct + statements.pct + functions.pct + branches.pct) / 4;

export { calculateCoverageAvg, getCoverageSummary, uploadCoverage };
