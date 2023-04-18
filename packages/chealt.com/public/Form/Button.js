import classnames from 'classnames';

import styles from './Input.module.css';

const Button = ({ children, isLink = false, emphasized, ghost, className, type, ...rest }) => {
  const Tag = isLink ? 'a' : 'button';

  return (
    <Tag
      class={classnames({
        [styles.button]: true,
        [styles.emphasized]: Boolean(emphasized),
        [styles.ghost]: Boolean(ghost),
        [className]: Boolean(className)
      })}
      type={type || 'button'}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default Button;
