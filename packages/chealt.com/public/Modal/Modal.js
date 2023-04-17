import classnames from 'classnames';
import { useEffect } from 'preact/hooks';

import styles from './Modal.module.css';

const Modal = ({ isOpen, close, isCentered, children }) => {
  useEffect(() => {
    if (isOpen) {
      // focus the first input
      const firstForm = document.forms[0];
      const firstInput = firstForm && firstForm[0];

      if (firstInput) {
        firstInput.focus();
      }
    }
  }, [isOpen]);

  return (
    <div
      class={classnames({
        [styles.modal]: true,
        [styles.open]: Boolean(isOpen),
        [styles.centered]: Boolean(isCentered)
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
