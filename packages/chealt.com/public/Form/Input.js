import styles from './Input.module.css';

const Input = ({ children, ...inputProps }) => (
  <label>
    {children}
    <input class={styles.input} {...inputProps} />
  </label>
);

export default Input;
