import { h } from 'preact';

import style from './CardBody.style.css';

const CardBody = ({ children }) => (
  <div class={style.cardBody}>{children}</div>
);

export default CardBody;
