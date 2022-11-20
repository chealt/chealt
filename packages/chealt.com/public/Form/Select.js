import classNames from 'classnames';

import ArrowDown from '../Icons/ArrowDown';

import styles from './Input.module.css';

const Select = ({ children, label, hideLabel, ...selectProps }) => (
  <label class={styles.label}>
    <div
      class={classNames({
        [styles.text]: true,
        [styles.visuallyHidden]: hideLabel
      })}
    >
      {label}
    </div>
    <div class={styles.selectWrapper}>
      <select class={styles.select} {...selectProps}>
        {children}
      </select>
      <ArrowDown class={styles.icon} />
    </div>
  </label>
);

export default Select;
