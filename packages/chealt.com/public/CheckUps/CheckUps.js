import { useContext } from 'preact/hooks';

import { AppState } from '../App/state';
import { useObjectStore } from '../IndexedDB/hooks';
import List from '../List/List';
import ListItem from '../List/ListItem';
import PageTitle from '../PageTitle/PageTitle';
import BloodType from './BloodType';
import { byProfileId, withCheckUpTag } from './utils';

const CheckUps = () => {
  const {
    profiles: { selectedProfileId }
  } = useContext(AppState);
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
              <ListItem key={checkUp.key}>{checkUp.value.name}</ListItem>
            ))}
          </List>
        </section>
      )}
    </>
  );
};

export default CheckUps;
