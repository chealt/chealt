import styles from './HeadCell.module.css';

const HeadCell = ({ children }) => <th class={styles.headCell}>{children}</th>;

export default HeadCell;
