import { useContext } from 'preact/hooks';
import { useTranslation } from 'preact-i18next';

import { AppState } from '../App/state';
import Button from '../Form/Button';
import Launch from '../Icons/Launch';
import { useObjectStore } from '../IndexedDB/hooks';
import { findItems } from '../IndexedDB/utils';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';

const HomeSection = ({ contentClassName, linkClassName }) => {
  const { t } = useTranslation();
  const {
    profiles: { selectedProfileId }
  } = useContext(AppState);
  const { isLoadingDocuments, items } = useObjectStore('documents', {
    sortBy: 'savedTimestamp',
    sortOrder: 'DESC'
  });
  const documentsItems = findItems(items, selectedProfileId.value).slice(0, 5);
  const hasDocumentsItems = !isLoadingDocuments && documentsItems.length > 0;
  const noDocumentsItems = !isLoadingDocuments && documentsItems.length === 0;

  return (
    <>
      {isLoadingDocuments && <LoadingIndicator />}
      {noDocumentsItems && (
        <>
          <p>{t('pages.home.documents.description')}</p>
          <Button isLink href={'/documents'}>
            {t('common.add')}
          </Button>
        </>
      )}
      {hasDocumentsItems && (
        <div class={contentClassName}>
          <ul>
            {documentsItems.map(({ key, value: { name } }) => (
              <li key={key}>{name}</li>
            ))}
          </ul>
          <Button className={linkClassName} isLink href="/documents">
            <Launch />
          </Button>
        </div>
      )}
    </>
  );
};

export default HomeSection;
