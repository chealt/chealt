import { h } from 'preact';

import style from './style.css';

const Card = ({ children }) => (
  <div class={style.card}>{children}</div>
);

export default Card;
