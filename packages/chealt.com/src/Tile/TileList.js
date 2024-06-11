import styles from './TileList.module.css';

const TileList = ({ children }) => <ul class={styles.tileList}>{children}</ul>;

export default TileList;
