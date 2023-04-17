import classnames from 'classnames';

import styles from './LoadingIndicator.module.css';

const LoadingIndicator = ({ size = 'medium' }) => (
  <div
    class={classnames({
      [styles.container]: true
    })}
  >
    <svg
      class={classnames({
        [styles.svg]: true,
        [styles[size]]: true
      })}
      style="fill:none;"
      viewBox="0 0 100 100"
    >
      <title>loading</title>
      <circle class={styles.stroke} cx="50%" cy="50%" r="44" />
    </svg>
  </div>
);

export default LoadingIndicator;
