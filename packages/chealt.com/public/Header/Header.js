import classnames from 'classnames';
import { useRef } from 'preact/hooks';
import { useTranslation } from 'preact-i18next';

import Button from '../Form/Button';
import Menu from '../Icons/Menu';
import ProfilePictureMenu from '../ProfilePicture/ProfilePictureMenu';

import styles from './Header.module.css';

const Header = () => {
  const { t } = useTranslation();
  const dialogRef = useRef();
  const navItems = [
    { href: '/', label: t('pages.home.nav') },
    { href: '/documents', label: t('pages.documents.nav') },
    { href: '/share', label: t('pages.share.nav') },
    { href: '/personal-details', label: t('pages.personalDetails.nav') },
    { href: '/check-ups', label: t('pages.checkUps.nav') },
    { href: '/vaccinations', label: t('pages.vaccinations.nav') },
    { href: '/profiles', label: t('pages.profiles.nav') }
  ];
  const toggleMenu = () => {
    const dialog = dialogRef.current;

    if (dialog.open) {
      dialog.close();
    } else {
      dialog.show();
    }
  };
  const closeMenu = () => {
    dialogRef.current.close();
  };
  const handleKey = (event) => {
    if (event.key === 'Escape') {
      closeMenu();
    }
  };

  return (
    <>
      <header class={styles.header}>
        <Button ghost hideLabel label={t('common.menu')} onClick={toggleMenu}>
          <Menu />
        </Button>
        <div class={styles.profileContainer}>
          <ProfilePictureMenu />
        </div>
      </header>
      <dialog
        id="navigationMenu"
        ref={dialogRef}
        onKeyUp={handleKey}
        onBlur={closeMenu}
        class={classnames({
          [styles.menu]: true
        })}
      >
        <nav class={styles.nav}>
          <Button ghost className={styles.closeMenuContainer} onClick={closeMenu}>
            <Menu />
          </Button>
          {navItems.map(({ href, label }) => (
            <a key={href} href={href} onClick={closeMenu}>
              {label}
            </a>
          ))}
        </nav>
      </dialog>
    </>
  );
};

export default Header;
