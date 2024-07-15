import classnames from 'classnames';

import styles from './Container.module.css';

const Container = ({ children, largeLimit }) => (
  <div
    class={classnames({
      [styles.container]: true,
      [styles.largeLimit]: Boolean(largeLimit)
    })}
  >
    {children}
  </div>
);

export default Container;
