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
  rounded,
  label,
  hideLabel,
  dark,
  wide = false,
  ...rest
}) => {
  const Tag = isLink ? 'a' : 'button';

  return (
    <Tag
      class={classnames({
        [styles.button]: true,
        [styles.contentOnly]: contentOnly,
        [styles.dark]: Boolean(dark),
        [styles.emphasized]: Boolean(emphasized),
        [styles.ghost]: Boolean(ghost),
        [styles.rounded]: Boolean(rounded),
        [styles.wide]: Boolean(wide),
        [className]: Boolean(className)
      })}
      aria-label={contentOnly || hideLabel ? label : undefined}
      type={type || 'button'}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default Button;
