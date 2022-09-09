import classnames from 'classnames';

import styles from './Controls.module.css';

const Controls = ({ children }) => (
  <div
    class={classnames({
      [styles.controls]: true
    })}
  >
    {children}
  </div>
);

export default Controls;
