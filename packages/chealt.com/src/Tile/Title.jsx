import classnames from 'classnames';

import styles from './Title.module.css';

const Title = ({ capitalize, children }) => (
  <div
    class={classnames({
      [styles.title]: true,
      [styles.capitalize]: capitalize
    })}
  >
    {children}
  </div>
);

export default Title;
