import classnames from 'classnames';
import { useEffect, useRef, useState } from 'preact/hooks';

import styles from './Dialog.module.css';

const Dialog = ({ children, dialogClassName, isOpen: isOpenProp, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef();
  const toggle = () => {
    const dialog = dialogRef.current;

    if (dialog.open) {
      dialog.close();
      setIsOpen(false);
      onClose();
    } else {
      dialog.show();
      setIsOpen(true);
    }
  };
  const close = () => {
    dialogRef.current.close();
    setIsOpen(false);
    onClose();
  };
  const handleKey = (event) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    setIsOpen(isOpenProp);
  }, [isOpenProp]);

  return (
    <>
      <div
        onClick={close}
        class={classnames({
          [styles.backdrop]: true,
          [styles.open]: isOpen
        })}
      />
      <dialog ref={dialogRef} onKeyUp={handleKey} class={dialogClassName} open={isOpen}>
        {children({ close, toggle, isOpen })}
      </dialog>
    </>
  );
};

export default Dialog;
