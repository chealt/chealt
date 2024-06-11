import Button from './Button';

import styles from './Tag.module.css';

const Tag = ({ value, deleteItem }) => (
  <>
    {value && (
      <div class={styles.tagsList}>
        {value?.split(',').map((item) => (
          <span key={item} class={styles.tag}>
            <span class={styles.tagText}>{item}</span>
            {deleteItem && (
              <Button
                dark
                ghost
                className={styles.deleteIcon}
                onClick={() => {
                  deleteItem(item);
                }}
              >
                X
              </Button>
            )}
          </span>
        ))}
      </div>
    )}
  </>
);

export default Tag;
