const isLocal = !process.env.CI;
const vercelUrl =
  process.env.GITHUB_HEAD_REF === 'main'
    ? 'https://chealt.com'
    : `https://chealt-git-${process.env.GITHUB_HEAD_REF}-chealt.vercel.app`;

const url = isLocal ? 'http://localhost:8080' : vercelUrl;

export { url };
