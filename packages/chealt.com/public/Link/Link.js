import classnames from 'classnames';

import styles from './Link.module.css';

const Link = ({ children, buttonStyled, ghost, ...linkProps }) => (
  <a class={classnames({ [styles.button]: buttonStyled, [styles.ghost]: ghost })} {...linkProps}>
    {children}
  </a>
);

export default Link;
