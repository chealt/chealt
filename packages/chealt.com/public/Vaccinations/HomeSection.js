import { localFormatDate } from '@chealt/browser-utils';
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
  const { isLoadingVaccinations, items } = useObjectStore('vaccinations');
  const vaccinationsItems = findItems(items, selectedProfileId.value);
  const hasVaccinationsItems = !isLoadingVaccinations && vaccinationsItems.length > 0;
  const noVaccinationsItems = !isLoadingVaccinations && vaccinationsItems.length === 0;

  return (
    <>
      {isLoadingVaccinations && <LoadingIndicator />}
      {noVaccinationsItems && (
        <>
          <p>{t('pages.home.vaccinations.description')}</p>
          <Button isLink href={'/vaccinations/new'}>
            {t('common.add')}
          </Button>
        </>
      )}
      {hasVaccinationsItems && (
        <div class={contentClassName}>
          <ul>
            {vaccinationsItems.map(({ key, value: { name, dateOfAdmin } }) => (
              <li key={key}>{`${name} - ${localFormatDate(dateOfAdmin)}`}</li>
            ))}
          </ul>
          <Button className={linkClassName} isLink href="/vaccinations">
            <Launch />
          </Button>
        </div>
      )}
    </>
  );
};

export default HomeSection;
