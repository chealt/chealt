import { h } from 'preact';

import style from './CardFooter.style.css';

const CardFooter = ({ children }) => <div class={style.cardFooter}>{children}</div>;

export default CardFooter;
