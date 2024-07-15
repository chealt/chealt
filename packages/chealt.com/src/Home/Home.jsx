import { useTranslation } from 'preact-i18next';

import DocumentsHomeSection from '../Documents/HomeSection';
import FamilyHistoryHomeSection from '../FamilyHistory/HomeSection';
import PageTitle from '../PageTitle/PageTitle';
import Tile from '../Tile/Tile';
import TileList from '../Tile/TileList';
import TileTitle from '../Tile/Title';
import VaccinationsHomeSection from '../Vaccinations/HomeSection';

import * as styles from './Home.module.css';

const Home = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageTitle>{t('pages.home.title')}</PageTitle>
      <h2>{t('pages.home.mainTitle')}</h2>
      <p>{t('pages.home.mainDescription')}</p>
      <TileList>
        <Tile>
          <TileTitle capitalize>{t('pages.familyHistory.title')}</TileTitle>
          <FamilyHistoryHomeSection
            contentClassName={styles.tileContent}
            linkClassName={styles.link}
          />
        </Tile>
        <Tile>
          <TileTitle capitalize>{t('pages.vaccinations.title')}</TileTitle>
          <VaccinationsHomeSection
            contentClassName={styles.tileContent}
            linkClassName={styles.link}
          />
        </Tile>
        <Tile>
          <TileTitle capitalize>{t('pages.documents.title')}</TileTitle>
          <DocumentsHomeSection contentClassName={styles.tileContent} linkClassName={styles.link} />
        </Tile>
      </TileList>
      <h2>{t('pages.home.privacyTitle')}</h2>
      <p>{t('pages.home.privacyDescription')}</p>
    </>
  );
};

export default Home;
