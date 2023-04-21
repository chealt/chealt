const url = process.env.CI
  ? `https://chealt-git-${process.env.GITHUB_REF_NAME}-chealt.vercel.app`
  : 'http://localhost:8080';

module.exports = {
  url
};
