import Button from '../Form/Button';

import styles from './Controls.module.css';

const Controls = ({ onDelete }) => (
  <div class={styles.controls}>
    <Button
      disabled={!onDelete}
      onClick={async (event) => {
        event.preventDefault();

        onDelete();
      }}
    >
      Delete
    </Button>
  </div>
);
export default Controls;
