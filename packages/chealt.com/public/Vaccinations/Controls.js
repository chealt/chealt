import Button from '../Form/Button';
import { deleteItem } from './utils';
import { add as addToast } from '../Toast';

import styles from './Controls.module.css';

const Controls = ({ instance, selectedItems, onDelete }) => (
  <div class={styles.controls}>
    <Button
      disabled={!selectedItems.length}
      onClick={async (event) => {
        event.preventDefault();

        if (selectedItems.length) {
          try {
            await deleteItem({ instance, items: selectedItems });

            onDelete();

            addToast({ message: 'Vaccination(s) deleted' });
          } catch {
            addToast({ message: 'Failed to delete vaccination(s)', role: 'alert' });
          }
        }
      }}
    >
      Delete
    </Button>
  </div>
);
export default Controls;
