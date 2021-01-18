import { h } from 'preact';
import { useContext } from 'preact/hooks';

import Button from '../Button/Button';
import Cross from '../Icons/Cross';
import { Context } from '../context';

import style from './style.css';

const Toast = () => {
  const { toastMessage, setToastMessage } = useContext(Context);

  return (
    toastMessage && (
      <div class={style.toast}>
        <div class={`${style.container} rounded--small text--emphasized`}>
          <div class={style.content}>{toastMessage}</div>
          <div class={style.buttons}>
            <Button type="ghost" size="small" onClick={() => setToastMessage()}><Cross /></Button>
          </div>
        </div>
      </div>
    )
  );
};

export default Toast;
