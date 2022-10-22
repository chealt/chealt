import classnames from 'classnames';
import { useRef } from 'preact/hooks';

import Button from './Button';
import Tag from './Tag';

import styles from './Input.module.css';

const Input = ({
  children,
  showRequired = true,
  hideLabel = false,
  type,
  value,
  ...inputProps
}) => {
  const tagInput = useRef(null);

  return (
    <>
      <label
        class={classnames({
          [styles.label]: true,
          [styles.inline]: inputProps.type === 'checkbox'
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
        {type === 'tag' ? (
          <div class={styles.tagContainer}>
            <input class={styles.input} type="text" {...inputProps} ref={tagInput} />
            <Button
              onClick={(event) => {
                event.preventDefault();

                if (tagInput.current.value) {
                  inputProps.addItem(tagInput.current.value);
                  tagInput.current.value = '';
                }
              }}
            >
              add
            </Button>
          </div>
        ) : (
          <input class={styles.input} type={type} value={value} {...inputProps} />
        )}
      </label>
      {type === 'tag' && <Tag value={value} deleteItem={inputProps.deleteItem} />}
    </>
  );
};

export default Input;
