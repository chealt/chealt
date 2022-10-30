import { useContext } from 'preact/hooks';

import { AppState } from '../App/state';
import { useObjectStore } from '../IndexedDB/hooks';
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
      <BloodType />
      {checkUps && (
        <ul>
          {checkUps.map((checkUp) => (
            <li key={checkUp.key}>{checkUp.value.name}</li>
          ))}
        </ul>
      )}
    </>
  );
};

export default CheckUps;
