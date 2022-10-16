import classnames from 'classnames';

import styles from './ListItem.module.css';

const ListItem = ({ className, children }) => (
  <li
    class={classnames({
      [styles.listItem]: true,
      [className]: Boolean(className)
    })}
  >
    {children}
  </li>
);

export default ListItem;
