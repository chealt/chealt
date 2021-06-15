const uploadCoverage = ({
  cloudProvider,
  APIKey,
  bucketName,
  coverageFolder,
  git: { domain, org, repo, branch, hash }
}) => true;

export { uploadCoverage };
