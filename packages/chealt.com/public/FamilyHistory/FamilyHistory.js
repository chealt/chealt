import { localFormatDate } from '@chealt/browser-utils';
import { useCallback, useContext, useState } from 'preact/hooks';
import { useTranslation } from 'preact-i18next';

import Controls from './Controls';
import NewItem from './NewItem';
import { AppState } from '../App/state';
import EmptyState from '../EmptyState/EmptyState';
import Button from '../Form/Button';
import Input from '../Form/Input';
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

const FamilyHistory = () => {
  const { t } = useTranslation();
  const {
    profiles: { selectedProfileId }
  } = useContext(AppState);
  const { save, isLoading, items, deleteItems } = useObjectStore('familyHistory');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const deleteEnabled = Boolean(selectedItems.length);
  const profileItems = findItems(items, selectedProfileId.value);
  const hasItems = Boolean(profileItems.length);

  const deleteSelectedItems = useCallback(async () => {
    try {
      await deleteItems(selectedItems);

      addToast({ message: t('pages.familyHistory.deleteSuccess') });

      setSelectedItems([]);
    } catch {
      addToast({ message: t('pages.familyHistory.deleteFailure'), role: 'alert' });
    }
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
                </Tile>
              ))}
            </TileList>
          )}
          <Button emphasized onClick={() => setIsModalOpen(true)}>
            {t('common.add')}
          </Button>
        </>
      )) || (
        <EmptyState>
          <History />
          <p>{t('pages.familyHistory.emptyFamilyHistory')}</p>
          <Button emphasized onClick={() => setIsModalOpen(true)}>
            {t('common.startAdding')}
          </Button>
        </EmptyState>
      )}
      <Modal isOpen={isModalOpen} close={() => setIsModalOpen(false)}>
        <NewItem save={save} onDone={() => setIsModalOpen(false)} />
      </Modal>
    </>
  );
};

export default FamilyHistory;
