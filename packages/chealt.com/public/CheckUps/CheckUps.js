import { useLocation } from 'preact-iso';
import { useContext } from 'preact/hooks';

import { AppState } from '../App/state';
import Button from '../Form/Button';
import Launch from '../Icons/Launch';
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
  const { route } = useLocation();
  const { items: documents } = useObjectStore('documents');
  const checkUps = documents?.filter(byProfileId(selectedProfileId.value))?.filter(withCheckUpTag);

  return (
    <>
      <PageTitle>Check-ups & Medical Tests</PageTitle>
      <section>
        <BloodType />
      </section>
      {checkUps && (
        <section>
          <List isSimple={false}>
            {checkUps.map((checkUp) => (
              <ListItem key={checkUp.key} className={styles.checkUp}>
                <div class={styles.name}>{checkUp.value.name}</div>
                <Button
                  ghost
                  onClick={() => {
                    route(`/documents/view/${btoa(checkUp.key)}`);
                  }}
                >
                  <Launch />
                </Button>
              </ListItem>
            ))}
          </List>
        </section>
      )}
    </>
  );
};

export default CheckUps;
