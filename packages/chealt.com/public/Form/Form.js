import styles from './Form.module.css';

const Form = ({ children, ...formProps }) => (
  <form class={styles.form} {...formProps}>
    {children}
  </form>
);

export default Form;
