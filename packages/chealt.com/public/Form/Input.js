import classnames from 'classnames';

import styles from './Input.module.css';

const Input = ({ children, showRequired = true, ...inputProps }) => (
  <label
    class={classnames({
      [styles.label]: true,
      [styles.inline]: inputProps.type === 'checkbox'
    })}
  >
    <div class={styles.text}>
      {children}
      {inputProps.required && showRequired && ' (required)'}
    </div>
    <input class={styles.input} {...inputProps} />
  </label>
);

export default Input;
