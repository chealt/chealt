import { useTranslation } from 'preact-i18next';

import Button from '../Form/Button';
import PageTitle from '../PageTitle/PageTitle';
import Tile from '../Tile/Tile';
import TileList from '../Tile/TileList';
import TileTitle from '../Tile/Title';

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
          <p>{t('pages.home.familyHistory.description')}</p>
          <Button isLink href={'/family-history/new'}>
            {t('common.add')}
          </Button>
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
