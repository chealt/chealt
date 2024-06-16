import { useLocation } from 'preact-iso';

import Button from '../Form/Button';
import Edit from '../Icons/Edit';

const EditButton = ({ documentKey }) => {
  const { route } = useLocation();

  return (
    <Button
      ghost
      onClick={() => {
        route(`/documents/edit/${documentKey}`);
      }}
    >
      <Edit />
    </Button>
  );
};

export default EditButton;
