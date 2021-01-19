import { h } from 'preact';

import style from './style.css';

const Card = ({ hasShadow, children }) => (
  <div class={`${style.card} rounded--small ${hasShadow ? 'shadow' : ''}`}>{children}</div>
);

export default Card;
