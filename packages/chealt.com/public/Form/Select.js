import styles from './Input.module.css';

const Select = ({ children, label, ...selectProps }) => (
  <label class={styles.label}>
    <div class={styles.text}>{label}</div>
    <select class={styles.select} {...selectProps}>
      {children}
    </select>
  </label>
);

export default Select;
