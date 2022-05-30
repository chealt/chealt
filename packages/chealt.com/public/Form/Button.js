import classnames from 'classnames';

import styles from './Input.module.css';

const Button = ({ children, emphasized, ghost, ...rest }) => (
  <button
    class={classnames({
      [styles.button]: true,
      [styles.emphasized]: Boolean(emphasized),
      [styles.ghost]: Boolean(ghost)
    })}
    {...rest}
  >
    {children}
  </button>
);

export default Button;
