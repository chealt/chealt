import styles from './Button.styles.css';

export const links = () => [
  {
    rel: 'stylesheet',
    href: styles
  }
];

const Button = ({ children, type, className, ariaLabel, iconOnly, position }) => (
  <button
    className={`bx--btn bx--btn--${type || 'primary'} ${iconOnly ? 'bx--btn--icon-only' : ''} ${
      position ? `bx--btn--icon-only--${position}` : ''
    } ${className}`}
    type="button"
    aria-label={ariaLabel || undefined}
  >
    {children}
  </button>
);

export default Button;
