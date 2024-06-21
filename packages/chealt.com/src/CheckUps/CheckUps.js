import { useContext } from 'preact/hooks';
import { Trans, useTranslation } from 'preact-i18next';

import BloodType from './BloodType';
import { byProfileId, withCheckUpTag } from './utils';
import { AppState } from '../App/state';
import checkUpTags from '../CheckUps/tags.json';
import ViewButton from '../Documents/ViewButton';
import EmptyState from '../EmptyState/EmptyState';
import CheckUpsIcon from '../Icons/CheckUps';
import { useObjectStore } from '../IndexedDB/hooks';
import List from '../List/List';
import ListItem from '../List/ListItem';
import PageTitle from '../PageTitle/PageTitle';

import styles from './CheckUps.module.css';

const CheckUps = () => {
  const { t } = useTranslation();
  const {
    profiles: { selectedProfileId }
  } = useContext(AppState);
  const { items: documents, isLoading } = useObjectStore('documents');
  const checkUpTagLabels = checkUpTags.map((tag) => t(`pages.checkUps.tags.${tag}`));
  const checkUps = documents
    ?.filter(byProfileId(selectedProfileId.value))
    ?.filter(withCheckUpTag(checkUpTagLabels));
  const hasCheckUps = Boolean(checkUps.length);
  const checkUpTagsText = checkUpTagLabels.join(', ');

  return isLoading ? null : (
    <>
      <PageTitle>{t('pages.checkUps.title')}</PageTitle>
      <section>
        <BloodType />
      </section>
      {(hasCheckUps && (
        <section>
          <List isSimple={false}>
            {checkUps.map(({ key, value: { name } }) => (
              <ListItem key={key} className={styles.checkUp}>
                <div class={styles.name}>{name}</div>
                <ViewButton documentKey={key} refererPage="check-ups" />
              </ListItem>
            ))}
          </List>
        </section>
      )) || (
        <EmptyState>
          <CheckUpsIcon />
          <p>
            <Trans i18nKey="pages.checkUps.tagInstructions" tags={checkUpTagsText}>
              Your Check-ups and medical tests will be shown here. Just tag your document with one
              of the following: <span>{{ tags: checkUpTagsText }}</span>.
            </Trans>
          </p>
        </EmptyState>
      )}
    </>
  );
};

export default CheckUps;
