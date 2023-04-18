import classnames from 'classnames';
import { useRef, useState } from 'preact/hooks';

import Button from './Button';
import Tag from './Tag';

import styles from './Input.module.css';

const Input = ({
  children,
  showRequired = true,
  hideLabel = false,
  type,
  value,
  icon,
  ...inputProps
}) => {
  const [typeOverride, setTypeOverride] = useState();
  const tagInput = useRef(null);

  const addTag = (event) => {
    event.preventDefault();

    if (tagInput.current.value) {
      inputProps.addItem(tagInput.current.value);
      tagInput.current.value = '';
    }
  };

  const showPassword = () => {
    setTypeOverride('text');

    setTimeout(() => {
      setTypeOverride();
    }, 10 * 1000); // 10 seconds
  };

  return (
    <>
      <label
        class={classnames({
          [styles.label]: true,
          [styles.inline]: type === 'checkbox'
        })}
      >
        <div
          class={classnames({
            [styles.text]: true,
            [styles.visuallyHidden]: hideLabel
          })}
        >
          {children}
          {inputProps.required && showRequired && ' (required)'}
        </div>
        <div
          class={classnames({
            [styles.container]: true,
            [styles.inputWithButton]: type === 'tag' || type === 'password'
          })}
        >
          {type === 'tag' ? (
            <>
              <input
                class={classnames({
                  [styles.input]: true
                })}
                type="text"
                {...inputProps}
                ref={tagInput}
                onKeyPress={(event) => {
                  if (event.key === 'Enter') {
                    addTag(event);
                  }
                }}
              />
              <Button onClick={addTag}>add</Button>
            </>
          ) : (
            <>
              <input
                class={classnames({
                  [styles.input]: true,
                  [styles.inputWithIcon]: Boolean(icon)
                })}
                type={typeOverride || type}
                value={value}
                {...inputProps}
              />
              {icon && icon}
              {type === 'password' && (
                <Button onClick={showPassword} disabled={typeOverride}>
                  show
                </Button>
              )}
            </>
          )}
        </div>
      </label>
      {type === 'tag' && <Tag value={value} deleteItem={inputProps.deleteItem} />}
    </>
  );
};

export default Input;
