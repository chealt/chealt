import styles from './Tag.module.css';
import inputStyles from './Input.module.css';

const Tag = ({ value, type, ...inputProps }) => (
  <>
    {value && (
      <div class={styles.tagsList}>
        {value?.split(',').map((item) => (
          <span key={item} class={styles.tag}>
            {item}
          </span>
        ))}
      </div>
    )}
    <input class={inputStyles.input} type="text" {...inputProps} />
  </>
);

export default Tag;
