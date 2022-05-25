import classNames from 'classnames';

import styles from './Input.module.css';

const Input = ({ children, ...inputProps }) => (
  <label
    class={classNames({
      [styles.label]: true,
      [styles.inline]: inputProps.type === 'checkbox'
    })}
  >
    <div class={styles.text}>{children}</div>
    <input class={styles.input} {...inputProps} />
  </label>
);

export default Input;
