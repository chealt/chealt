import classnames from 'classnames';

import styles from './Form.module.css';

const Form = ({ children, ...formProps }) => (
  <form
    class={classnames({
      [styles.form]: true,
      [styles.centered]: formProps.centered,
      [formProps.classNames]: Boolean(formProps.classNames)
    })}
    {...formProps}
  >
    {children}
  </form>
);

export default Form;
