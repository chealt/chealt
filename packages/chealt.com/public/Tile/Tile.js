import styles from './Tile.module.css';

const Tile = ({ children }) => <li class={styles.tile}>{children}</li>;

export default Tile;
