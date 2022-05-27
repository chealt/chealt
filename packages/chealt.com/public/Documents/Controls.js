import Button from '../Form/Button';
import { deleteDocuments } from './utils';

import styles from './Controls.module.css';

const Controls = ({ instance, setDocuments, selectedDocuments }) => (
  <div class={styles.controls}>
    <Button
      disabled={!selectedDocuments.length}
      onClick={async (event) => {
        event.preventDefault();

        if (selectedDocuments.length) {
          const documents = await deleteDocuments(instance)(selectedDocuments);

          setDocuments(documents);
        }
      }}
    >
      Delete
    </Button>
  </div>
);
export default Controls;
