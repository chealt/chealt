import { localFormatDate } from '@chealt/browser-utils';
import { useCallback, useContext, useState } from 'preact/hooks';
import { useTranslation } from 'preact-i18next';
import { useRoute, useLocation } from 'preact-iso';

import Controls from './Controls';
import Item from './Item';
import { AppState } from '../App/state';
import EmptyState from '../EmptyState/EmptyState';
import Button from '../Form/Button';
import Input from '../Form/Input';
import Tag from '../Form/Tag';
import { toggleItem } from '../Helpers/array';
import History from '../Icons/History';
import { useObjectStore } from '../IndexedDB/hooks';
import { findItems } from '../IndexedDB/utils';
import Modal from '../Modal/Modal';
import PageTitle from '../PageTitle/PageTitle';
import TileSubtitle from '../Tile/Subtitle';
import Tile from '../Tile/Tile';
import TileList from '../Tile/TileList';
import TileTitle from '../Tile/Title';
import { add as addToast } from '../Toast/Toast';

import styles from './FamilyHistory.module.css';

const FamilyHistory = () => {
  const { t } = useTranslation();
  const { route } = useLocation();
  const { action } = useRoute();
  const {
    profiles: { selectedProfileId }
  } = useContext(AppState);
  const { save, isLoading, items, deleteItems } = useObjectStore('familyHistory');
  const [isModalOpen, setIsModalOpen] = useState(action === 'new');
  const [selectedItems, setSelectedItems] = useState([]);
  const [itemToEdit, setItemToEdit] = useState();

  const deleteEnabled = Boolean(selectedItems.length);
  const profileItems = findItems(items, selectedProfileId.value);
  const hasItems = Boolean(profileItems.length);

  const editItem = (key) => {
    const item = profileItems.find((i) => key === i.key);

    setItemToEdit(item);
    setIsModalOpen(true);
  };

  const deleteSelectedItems = useCallback(async () => {
    try {
      await deleteItems(selectedItems);

      addToast({ message: t('pages.familyHistory.deleteSuccess') });

      setSelectedItems([]);
    } catch {
      addToast({ message: t('pages.familyHistory.deleteFailure'), role: 'alert' });
    }

    setItemToEdit(null);
  }, [deleteItems, selectedItems, t]);

  if (isLoading) {
    return null;
  }

  return (
    <>
      <PageTitle>{t('pages.familyHistory.title')}</PageTitle>
      {(hasItems && (
        <>
          <Controls onDelete={deleteEnabled && deleteSelectedItems} />
          {profileItems?.length && (
            <TileList>
              {profileItems.map((familyHistory) => (
                <Tile key={familyHistory.key}>
                  <TileTitle>{`${familyHistory.value.firstName} ${familyHistory.value.lastName}`}</TileTitle>
                  <TileSubtitle>{localFormatDate(familyHistory.value.dateOfBirth)}</TileSubtitle>
                  <div>
                    <div class={styles.label}>{`${t('pages.familyHistory.conditions')}:`}</div>
                    <Tag value={familyHistory.value.conditions.join(',')} />
                  </div>
                  <div>
                    {' '}
                    <Input
                      type="checkbox"
                      value={familyHistory.key}
                      onClick={() => {
                        setSelectedItems(toggleItem(familyHistory.key, selectedItems));
                      }}
                    >
                      {t('common.select')}
                    </Input>
                  </div>
                  <div class={styles.controls}>
                    <Button onClick={() => editItem(familyHistory.key)}>{t('common.edit')}</Button>
                  </div>
                </Tile>
              ))}
            </TileList>
          )}
          <Button
            emphasized
            onClick={() => {
              setItemToEdit(null);

              route('/family-history/new');
            }}
          >
            {t('common.add')}
          </Button>
        </>
      )) || (
        <EmptyState>
          <History />
          <p>{t('pages.familyHistory.emptyFamilyHistory')}</p>
          <Button
            emphasized
            onClick={() => {
              setIsModalOpen(true);

              route('/family-history/new');
            }}
          >
            {t('common.startAdding')}
          </Button>
        </EmptyState>
      )}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          close={() => {
            setIsModalOpen(false);

            if (action === 'new') {
              route('/family-history');
            }
          }}
        >
          <Item
            save={save}
            onDone={() => {
              setIsModalOpen(false);

              if (action === 'new') {
                route('/family-history');
              }
            }}
            id={itemToEdit?.key}
            {...itemToEdit}
          />
        </Modal>
      )}
    </>
  );
};

export default FamilyHistory;
