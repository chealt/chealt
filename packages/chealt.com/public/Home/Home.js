import { useContext } from 'preact/hooks';
import { useTranslation } from 'preact-i18next';

import { AppState } from '../App/state';
import Button from '../Form/Button';
import Launch from '../Icons/Launch';
import { useObjectStore } from '../IndexedDB/hooks';
import { findItems } from '../IndexedDB/utils';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import PageTitle from '../PageTitle/PageTitle';
import Tile from '../Tile/Tile';
import TileList from '../Tile/TileList';
import TileTitle from '../Tile/Title';

import * as styles from './Home.module.css';

const Home = () => {
  const { t } = useTranslation();
  const {
    profiles: { selectedProfileId }
  } = useContext(AppState);
  const { isLoadingFamilyHistory, items } = useObjectStore('familyHistory');
  const familyHistoryItems = findItems(items, selectedProfileId.value);
  const hasFamilyHistoryItems = !isLoadingFamilyHistory && familyHistoryItems.length;
  const noFamilyHistoryItems = !isLoadingFamilyHistory && !familyHistoryItems.length;

  return (
    <>
      <PageTitle>{t('pages.home.title')}</PageTitle>
      <h2>{t('pages.home.mainTitle')}</h2>
      <p>{t('pages.home.mainDescription')}</p>
      <TileList>
        <Tile>
          <TileTitle capitalize>{t('pages.familyHistory.title')}</TileTitle>
          {isLoadingFamilyHistory && <LoadingIndicator />}
          {noFamilyHistoryItems && (
            <>
              <p>{t('pages.home.familyHistory.description')}</p>
              <Button isLink href={'/family-history/new'}>
                {t('common.add')}
              </Button>
            </>
          )}
          {hasFamilyHistoryItems && (
            <div class={styles.tileContent}>
              <ul>
                {familyHistoryItems.map(({ key, value: { firstName, lastName } }) => (
                  <li key={key}>{`${firstName} ${lastName}`}</li>
                ))}
              </ul>
              <Button className={styles.link} isLink href="/family-history">
                <Launch />
              </Button>
            </div>
          )}
        </Tile>
        <Tile>
          <TileTitle capitalize>{t('pages.vaccinations.title')}</TileTitle>
          <p>{t('pages.home.vaccinations.description')}</p>
          <Button isLink href={'/vaccinations/new'}>
            {t('common.add')}
          </Button>
        </Tile>
        <Tile>
          <TileTitle capitalize>{t('pages.documents.title')}</TileTitle>
          <p>{t('pages.home.documents.description')}</p>
          <Button isLink href={'/documents'}>
            {t('common.add')}
          </Button>
        </Tile>
      </TileList>
      <h2>{t('pages.home.privacyTitle')}</h2>
      <p>{t('pages.home.privacyDescription')}</p>
    </>
  );
};

export default Home;
