import Link from '../Link';
import PageTitle from '../PageTitle';

const Home = () => (
  <>
    <PageTitle>Chealt.com</PageTitle>
    <h2>What</h2>
    <p>
      This application helps you stay healthy and happy. Look around, you might see something
      useful.
    </p>
    <h2>Privacy</h2>
    <p>
      All the data you enter into the application is stored on your device. There are no cookies,
      third-party integrations, or anything like that. If there is a feature that requires you to
      send some data somewhere, we will always ask for your permission and let you know about the
      consequences.
    </p>
    <h2>Improvements</h2>
    <p>
      If you have an idea how to make this app even more useful, let us know{' '}
      <Link
        target="_blank"
        href="https://github.com/chealt/chealt/issues/new?assignees=atikenny&labels=component:chealt.com&template=feature_request.md&title="
        rel="noreferrer"
      >
        here
      </Link>{' '}
      by creating a{' '}
      <Link
        target="_blank"
        href="https://docs.github.com/en/issues/tracking-your-work-with-issues/about-issues"
        rel="noreferrer"
      >
        GitHub issue
      </Link>
      .
    </p>
  </>
);

export default Home;
