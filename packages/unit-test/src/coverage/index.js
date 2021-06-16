const validateIBMConfig = (config) => {};

const validateCloudProviderConfig = (config) => {
  if (!config) {
    throw new Error('Please provide a cloud provider config.');
  }

  switch (config.provider) {
    case 'IBM':
      return validateIBMConfig(config);
    default:
      throw new Error(`Unknown cloud provider: "${config.provider}"`);
  }
};

const uploadCoverage = (
  { cloudProviderConfig, APIKey, bucketName, coverageFolder, git: { domain, org, repo, branch, hash } } = { git: {} }
) => {
  validateCloudProviderConfig(cloudProviderConfig);

  return true;
};

export { uploadCoverage };
