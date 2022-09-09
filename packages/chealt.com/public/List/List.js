import classnames from 'classnames';

import styles from './List.module.css';

const List = ({ children, isSimple = true }) => (
  <ul
    class={classnames({
      [styles.simple]: isSimple
    })}
  >
    {children}
  </ul>
);

export default List;
