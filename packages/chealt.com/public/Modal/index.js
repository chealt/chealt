import classnames from 'classnames';

import styles from './index.module.css';

const Modal = ({ isOpen, close, children }) => (
  <div
    class={classnames({
      [styles.modal]: true,
      [styles.open]: Boolean(isOpen)
    })}
  >
    <span class={styles.close} onClick={close}>
      X
    </span>
    {children}
  </div>
);

export default Modal;
