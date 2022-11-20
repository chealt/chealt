import { useTranslation } from 'preact-i18next';

import LanguageSelector from '../Intl/LanguageSelector';

import styles from './Header.module.css';

const Header = () => {
  const { t } = useTranslation();

  return (
    <header class={styles.header}>
      <nav>
        <a href="/">{t('pages.home.nav')}</a>
        <a href="/documents">{t('pages.documents.nav')}</a>
        <a href="/share">{t('pages.share.nav')}</a>
        <a href="/personal-details">{t('pages.personalDetails.nav')}</a>
        <a href="/check-ups">{t('pages.checkUps.nav')}</a>
        <a href="/vaccinations">{t('pages.vaccinations.nav')}</a>
        <a href="/profiles">{t('pages.profiles.nav')}</a>
      </nav>
      <LanguageSelector />
    </header>
  );
};

export default Header;
