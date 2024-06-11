import { localFormatDate } from '@chealt/browser-utils';
import { useCallback, useContext, useState } from 'preact/hooks';
import { useTranslation } from 'preact-i18next';
import { useRoute, useLocation } from 'preact-iso';

import Controls from './Controls';
import NewItem from './NewItem';
import { AppState } from '../App/state';
import EmptyState from '../EmptyState/EmptyState';
import Button from '../Form/Button';
import Input from '../Form/Input';
import Tag from '../Form/Tag';
import { toggleItem } from '../Helpers/array';
import Vaccine from '../Icons/Vaccine';
import { useObjectStore } from '../IndexedDB/hooks';
import { findItems } from '../IndexedDB/utils';
import Modal from '../Modal/Modal';
import PageTitle from '../PageTitle/PageTitle';
import TileSubtitle from '../Tile/Subtitle';
import Tile from '../Tile/Tile';
import TileList from '../Tile/TileList';
import TileTitle from '../Tile/Title';
import { add as addToast } from '../Toast/Toast';

import styles from './Vaccinations.module.css';

const Vaccinations = () => {
  const { t } = useTranslation();
  const { route } = useLocation();
  const { action } = useRoute();
  const {
    profiles: { selectedProfileId }
  } = useContext(AppState);
  const [isModalOpen, setIsModalOpen] = useState(action === 'new');
  const [selectedItems, setSelectedItems] = useState([]);
  const deleteEnabled = Boolean(selectedItems.length);
  const { deleteItems, save, isLoading, items } = useObjectStore('vaccinations');
  const profileItems = findItems(items, selectedProfileId.value);
  const hasVaccinations = Boolean(profileItems.length);

  const deleteSelectedItems = useCallback(async () => {
    try {
      await deleteItems(selectedItems);

      addToast({ message: t('pages.vaccinations.deleteSuccess') });

      setSelectedItems([]);
    } catch {
      addToast({ message: t('pages.vaccinations.deleteFailure'), role: 'alert' });
    }
  }, [deleteItems, selectedItems, t]);

  return isLoading ? null : (
    <>
      <PageTitle>{t('pages.vaccinations.title')}</PageTitle>
      {(hasVaccinations && (
        <>
          <Controls onDelete={deleteEnabled && deleteSelectedItems} />
          {profileItems?.length && (
            <TileList>
              {profileItems.map((vaccination) => (
                <Tile key={vaccination.key}>
                  <TileSubtitle>{localFormatDate(vaccination.value.dateOfAdmin)}</TileSubtitle>
                  <TileTitle>{vaccination.value.name}</TileTitle>
                  <div class={styles.details}>
                    <div>
                      <div class={styles.label}>{`${t('pages.vaccinations.conditions')}:`}</div>
                      <Tag value={vaccination.value.conditions.join(',')} />
                    </div>
                    {vaccination.value.brandName && (
                      <div>
                        <div class={styles.label}>{`${t('pages.vaccinations.brandName')}:`}</div>
                        {vaccination.value.brandName}
                      </div>
                    )}
                    {vaccination.value.batchNo && (
                      <div>
                        <div class={styles.label}>{`${t('pages.vaccinations.batchNo')}:`}</div>
                        {vaccination.value.batchNo}
                      </div>
                    )}
                    {vaccination.value.site && (
                      <div>
                        <div class={styles.label}>{`${t('pages.vaccinations.site')}:`}</div>
                        {vaccination.value.site}
                      </div>
                    )}
                    {vaccination.value.immuniser && (
                      <div>
                        <div class={styles.label}>{`${t('pages.vaccinations.immuniser')}:`}</div>
                        {vaccination.value.immuniser}
                      </div>
                    )}
                    {vaccination.value.venue && (
                      <div>
                        <div class={styles.label}>{`${t('pages.vaccinations.venue')}:`}</div>
                        {vaccination.value.venue}
                      </div>
                    )}
                    <div>
                      {' '}
                      <Input
                        type="checkbox"
                        value={vaccination.key}
                        onClick={() => {
                          setSelectedItems(toggleItem(vaccination.key, selectedItems));
                        }}
                      >
                        {t('common.select')}
                      </Input>
                    </div>
                  </div>
                </Tile>
              ))}
            </TileList>
          )}
          <Button
            emphasized
            onClick={() => {
              route('/vaccinations/new');
            }}
          >
            {t('common.add')}
          </Button>
        </>
      )) || (
        <EmptyState>
          <Vaccine />
          <p>{t('pages.vaccinations.emptyVaccinations')}</p>
          <Button emphasized onClick={() => route('/vaccinations/new')}>
            {t('common.startAdding')}
          </Button>
        </EmptyState>
      )}
      <Modal
        isOpen={isModalOpen}
        close={() => {
          setIsModalOpen(false);

          if (action === 'new') {
            route('/vaccinations');
          }
        }}
      >
        <NewItem
          save={save}
          onDone={() => {
            setIsModalOpen(false);

            if (action === 'new') {
              route('/vaccinations');
            }
          }}
        />
      </Modal>
    </>
  );
};

export default Vaccinations;
