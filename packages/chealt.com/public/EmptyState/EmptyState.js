import styles from './EmptyState.module.css';

const EmptyState = ({ children }) => <div class={styles.emptyState}>{children}</div>;

export default EmptyState;
