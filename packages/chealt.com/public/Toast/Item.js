import styles from './Item.module.css';

const Item = ({ children }) => (
  <output class={styles.item} role="status">
    {children}
  </output>
);

export default Item;
