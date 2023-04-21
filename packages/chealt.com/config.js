const url = process.env.CI
  ? `https://chealt-git-${process.env.GITHUB_HEAD_REF}-chealt.vercel.app`
  : 'http://localhost:8080';

export { url };
