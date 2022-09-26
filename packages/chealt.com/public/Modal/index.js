import classnames from 'classnames';
import { useEffect } from 'preact/hooks';

import styles from './index.module.css';

const Modal = ({ isOpen, close, children }) => {
  useEffect(() => {
    if (isOpen) {
      // focus the first input
      document.forms[0][0].focus();
    }
  }, [isOpen]);

  return (
    <div
      class={classnames({
        [styles.modal]: true,
        [styles.open]: Boolean(isOpen)
      })}
      onKeyUp={(event) => {
        if (event.key === 'Escape') {
          close();
        }
      }}
    >
      <span class={styles.close} onClick={close}>
        X
      </span>
      {children}
    </div>
  );
};

export default Modal;
