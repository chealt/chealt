import styles from './PageTitle.module.css';

const PageTitle = ({ children }) => <h1 class={styles.container}>{children}</h1>;

export default PageTitle;
