import styles from './Input.module.css';

const Select = ({ children, label, ...selectProps }) => (
  <label>
    {label}
    <select class={styles.select} {...selectProps}>
      {children}
    </select>
  </label>
);

export default Select;
