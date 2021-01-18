import { h } from 'preact';

import style from './style.css';

const Button = ({ size, type, children, ...rest }) => (
  <button class={`${size ? style[size] : ''} ${type ? style[type] : ''}`} {...rest}>{children}</button>
);

export default Button;
