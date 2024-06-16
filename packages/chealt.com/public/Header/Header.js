import classnames from 'classnames';
import { useState } from 'preact/hooks';
import { useTranslation } from 'preact-i18next';

import Dialog from '../Dialog/Dialog';
import Button from '../Form/Button';
import Close from '../Icons/Close';
import Menu from '../Icons/Menu';
import ProfilePictureMenu from '../ProfilePicture/ProfilePictureMenu';

import styles from './Header.module.css';

const Header = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navItems = [
    { href: '/', label: t('pages.home.nav') },
    { href: '/documents', label: t('pages.documents.nav') },
    { href: '/share', label: t('pages.share.nav') },
    { href: '/personal-details', label: t('pages.personalDetails.nav') },
    { href: '/check-ups', label: t('pages.checkUps.nav') },
    { href: '/vaccinations', label: t('pages.vaccinations.nav') },
    { href: '/integrations', label: t('pages.integrations.nav') },
    { href: '/family-history', label: t('pages.familyHistory.nav') },
    { href: '/profiles', label: t('pages.profiles.nav') }
  ];

  return (
    <>
      <header class={styles.header}>
        <Button hideLabel label={t('common.menu')} onClick={() => setIsMenuOpen(true)}>
          <Menu />
        </Button>
        <div class={styles.profileContainer}>
          <ProfilePictureMenu />
        </div>
      </header>
      <Dialog
        isOpen={isMenuOpen}
        dialogClassName={styles.menu}
        onClose={() => setIsMenuOpen(false)}
      >
        {({ close }) => (
          <nav class={styles.nav}>
            <Button ghost className={styles.closeMenuContainer} onClick={close}>
              <img class={styles.logo} src="/favicon.png" alt={t('common.icon')} />
              <span class={styles.chealt}>{t('common.chealt')}</span>
              <Close />
            </Button>
            {navItems.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={close}
                class={classnames({
                  [styles.active]: location.pathname === href
                })}
              >
                {label}
              </a>
            ))}
          </nav>
        )}
      </Dialog>
    </>
  );
};

export default Header;
