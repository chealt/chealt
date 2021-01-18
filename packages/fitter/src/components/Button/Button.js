import { h } from 'preact';

import style from './style.css';

const Button = ({ size, children, ...rest }) => (
  <button class={size ? style[size] : undefined} {...rest}>{children}</button>
);

export default Button;
