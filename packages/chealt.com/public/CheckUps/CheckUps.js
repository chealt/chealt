import { useContext } from 'preact/hooks';

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
  const {
    profiles: { selectedProfileId }
  } = useContext(AppState);
  const { items: documents, isLoading } = useObjectStore('documents');
  const checkUps = documents?.filter(byProfileId(selectedProfileId.value))?.filter(withCheckUpTag);
  const hasCheckUps = Boolean(checkUps.length);

  return isLoading ? null : (
    <>
      <PageTitle>Check-ups & Medical Tests</PageTitle>
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
            Your Check-ups and medical tests will be shown here. Just tag your document with one of
            the following: {checkUpTags.join(', ')}.
          </p>
        </EmptyState>
      )}
    </>
  );
};

export default CheckUps;
