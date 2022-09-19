import { signal } from '@preact/signals';

import styles from './index.module.css';
import Item from './Item';

const toasts = signal([]);

const removeLast = () => {
  toasts.value = toasts.value.slice(1);
};

const add = (toast) => {
  toasts.value = [...toasts.value, toast];

  setTimeout(removeLast, 4 * 1000); // 4 seconds
};

const Toast = () => (
  <section class={styles.toast}>
    {toasts.value.map(({ message, role }) => (
      <Item key={message} role={role}>
        {message}
      </Item>
    ))}
  </section>
);

export { add };

export default Toast;
