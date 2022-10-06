import classnames from 'classnames';

import styles from './Item.module.css';

const Item = ({ children, role = 'log' }) => (
  <output
    class={classnames({
      [styles.item]: true,
      [styles.alert]: role === 'alert'
    })}
    role={role}
  >
    {children}
  </output>
);

export default Item;
