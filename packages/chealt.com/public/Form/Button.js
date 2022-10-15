import classnames from 'classnames';

import styles from './Input.module.css';

const Button = ({ children, emphasized, ghost, className, type, ...rest }) => (
  <button
    class={classnames({
      [styles.button]: true,
      [styles.emphasized]: Boolean(emphasized),
      [styles.ghost]: Boolean(ghost),
      [className]: Boolean(className)
    })}
    type={type || 'button'}
    {...rest}
  >
    {children}
  </button>
);

export default Button;
