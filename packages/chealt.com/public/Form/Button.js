import classnames from 'classnames';

import styles from './Input.module.css';

const Button = ({ children, emphasized, ...rest }) => (
  <button
    class={classnames({
      [styles.button]: true,
      [styles.emphasized]: Boolean(emphasized)
    })}
    {...rest}
  >
    {children}
  </button>
);

export default Button;
