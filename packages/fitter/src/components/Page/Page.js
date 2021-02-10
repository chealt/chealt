import { h } from 'preact';

import style from './style.css';

const Page = ({ children }) => <div class={style.page}>{children}</div>;

export default Page;
