import { h } from 'preact';

import style from './style.css';

const Popover = ({ isOpen, children }) => (
  <div
    class={`${style.popover} ${isOpen ? style.open : ''}`}
  >
    {children}
  </div>
);

export default Popover;
