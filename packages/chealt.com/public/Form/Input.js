import styles from './Input.module.css';

const Input = ({ children, ...inputProps }) => (
  <label class={styles.label}>
    <div class={styles.text}>{children}</div>
    <input class={styles.input} {...inputProps} />
  </label>
);

export default Input;
