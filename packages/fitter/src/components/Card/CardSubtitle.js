import { h } from 'preact';

import style from './CardSubtitle.style.css';

const CardSubtitle = ({ children }) => <div class={`${style.cardSubtitle} text--emphasized`}>{children}</div>;

export default CardSubtitle;
