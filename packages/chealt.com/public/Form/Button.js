import classnames from 'classnames';

import styles from './Input.module.css';

const Button = ({
  children,
  isLink = false,
  emphasized,
  ghost,
  className,
  type,
  contentOnly,
  ...rest
}) => {
  const Tag = isLink ? 'a' : 'button';

  return (
    <Tag
      class={classnames({
        [styles.button]: true,
        [styles.contentOnly]: contentOnly,
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
