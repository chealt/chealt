import { useLocation } from 'preact-iso';

import Button from '../Form/Button';
import Launch from '../Icons/Launch';

const ViewButton = ({ documentKey, refererPage }) => {
  const { route } = useLocation();

  return (
    <Button
      ghost
      onClick={() => {
        route(`/documents/view/${btoa(documentKey)}/${refererPage}`);
      }}
    >
      <Launch />
    </Button>
  );
};

export default ViewButton;
