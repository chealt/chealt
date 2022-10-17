import classnames from 'classnames';

import styles from './List.module.css';

const List = ({ children, className, isSimple = true }) => (
  <ul
    class={classnames({
      [styles.simple]: isSimple,
      [className]: Boolean(className)
    })}
  >
    {children}
  </ul>
);

export default List;
