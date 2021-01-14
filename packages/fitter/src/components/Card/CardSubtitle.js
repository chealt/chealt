import { h } from 'preact';

import style from './CardSubtitle.style.css';

const CardSubtitle = ({ children }) => (
  <div class={style.cardSubtitle}>{children}</div>
);

export default CardSubtitle;
