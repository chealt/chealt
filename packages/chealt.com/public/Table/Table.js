import styles from './Table.module.css';

const Table = ({ children }) => <table class={styles.table}>{children}</table>;

export default Table;
