import { Trans, useTranslation } from 'preact-i18next';

import Link from '../Link/Link';
import PageTitle from '../PageTitle/PageTitle';

const Home = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageTitle>{t('pages.home.title')}</PageTitle>
      <h2>{t('pages.home.mainTitle')}</h2>
      <p>{t('pages.home.mainDescription')}</p>
      <h2>{t('pages.home.privacyTitle')}</h2>
      <p>{t('pages.home.privacyDescription')}</p>
      <h2>{t('pages.home.improvementsTitle')}</h2>
      <p>
        <Trans i18nKey="pages.home.improvementsDescription">
          If you have an idea how to make this app even more useful, let us know
          <Link
            target="_blank"
            href="https://github.com/chealt/chealt/issues/new?assignees=atikenny&labels=component:chealt.com&template=feature_request.md&title="
            rel="noreferrer"
          >
            here
          </Link>
          by creating a
          <Link
            target="_blank"
            href="https://docs.github.com/en/issues/tracking-your-work-with-issues/about-issues"
            rel="noreferrer"
          >
            GitHub issue
          </Link>
          .
        </Trans>
      </p>
    </>
  );
};

export default Home;
