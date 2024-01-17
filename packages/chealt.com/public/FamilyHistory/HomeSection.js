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
  const { isLoadingFamilyHistory, items } = useObjectStore('familyHistory');
  const familyHistoryItems = findItems(items, selectedProfileId.value);
  const hasFamilyHistoryItems = !isLoadingFamilyHistory && familyHistoryItems.length > 0;
  const noFamilyHistoryItems = !isLoadingFamilyHistory && familyHistoryItems.length === 0;

  return (
    <>
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
        <div class={contentClassName}>
          <ul>
            {familyHistoryItems.map(({ key, value: { firstName, lastName } }) => (
              <li key={key}>{`${firstName} ${lastName}`}</li>
            ))}
          </ul>
          <Button className={linkClassName} isLink href="/family-history">
            <Launch />
          </Button>
        </div>
      )}
    </>
  );
};

export default HomeSection;
