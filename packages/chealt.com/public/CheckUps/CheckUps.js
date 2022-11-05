import { useContext } from 'preact/hooks';

import { AppState } from '../App/state';
import ViewButton from '../Documents/ViewButton';
import { useObjectStore } from '../IndexedDB/hooks';
import List from '../List/List';
import ListItem from '../List/ListItem';
import PageTitle from '../PageTitle/PageTitle';
import BloodType from './BloodType';
import { byProfileId, withCheckUpTag } from './utils';

import styles from './CheckUps.module.css';

const CheckUps = () => {
  const {
    profiles: { selectedProfileId }
  } = useContext(AppState);
  const { items: documents } = useObjectStore('documents');
  const checkUps = documents?.filter(byProfileId(selectedProfileId.value))?.filter(withCheckUpTag);

  return (
    <>
      <PageTitle>Check-ups & Medical Tests</PageTitle>
      {checkUps && (
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
      )}
      <section>
        <BloodType />
      </section>
    </>
  );
};

export default CheckUps;
