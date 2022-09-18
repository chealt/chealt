import classnames from 'classnames';

import styles from './ListItem.module.css';

const ListItem = ({ children }) => (
  <li
    class={classnames({
      [styles.listItem]: true
    })}
  >
    {children}
  </li>
);

export default ListItem;
