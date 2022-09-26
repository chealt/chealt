import styles from './Cell.module.css';

const Cell = ({ children }) => <td class={styles.cell}>{children}</td>;

export default Cell;
