import Button from '../Form/Button';
import { deleteDocuments } from './utils';
import { add as addToast } from '../Toast';

import styles from './Controls.module.css';

const Controls = ({ instance, setDocuments, selectedDocuments }) => (
  <div class={styles.controls}>
    <Button
      disabled={!selectedDocuments.length}
      onClick={async (event) => {
        event.preventDefault();

        if (selectedDocuments.length) {
          try {
            const documents = await deleteDocuments(instance)(selectedDocuments);

            setDocuments(documents);
            addToast({ message: 'Document(s) deleted' });
          } catch {
            addToast({ message: 'Failed to delete document(s)', role: 'alert' });
          }
        }
      }}
    >
      Delete
    </Button>
  </div>
);
export default Controls;
