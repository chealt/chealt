import classNames from 'classnames';

import ArrowDown from '../Icons/ArrowDown';

import styles from './Input.module.css';

const Select = ({ children, label, hideLabel, inline, ...selectProps }) => (
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
      <select
        class={classNames({
          [styles.select]: true,
          [styles.inline]: inline
        })}
        {...selectProps}
      >
        {children}
      </select>
      <ArrowDown class={styles.icon} />
    </div>
  </label>
);

export default Select;
