import { useTranslation } from 'preact-i18next';

import styles from './Header.module.css';

const Header = () => {
  const { t } = useTranslation();

  return (
    <header class={styles.header}>
      <nav>
        <a href="/">{t('pages.home')}</a>
        <a href="/documents">{t('pages.documents')}</a>
        <a href="/share">{t('pages.share')}</a>
        <a href="/personal-details">{t('pages.personalDetails')}</a>
        <a href="/check-ups">{t('pages.checkUps')}</a>
        <a href="/vaccinations">{t('pages.vaccinations')}</a>
        <a href="/profiles">{t('pages.profiles')}</a>
      </nav>
    </header>
  );
};

export default Header;
