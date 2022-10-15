import classnames from 'classnames';
import Tag from './Tag';

import styles from './Input.module.css';
import Button from './Button';
import { useRef } from 'preact/hooks';

const Input = ({ children, showRequired = true, type, value, ...inputProps }) => {
  const tagInput = useRef(null);

  return (
    <>
      <label
        class={classnames({
          [styles.label]: true,
          [styles.inline]: inputProps.type === 'checkbox'
        })}
      >
        <div class={styles.text}>
          {children}
          {inputProps.required && showRequired && ' (required)'}
        </div>
        {type === 'tag' ? (
          <>
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
          </>
        ) : (
          <input class={styles.input} type={type} value={value} {...inputProps} />
        )}
      </label>
      {type === 'tag' && <Tag value={value} deleteItem={inputProps.deleteItem} />}
    </>
  );
};

export default Input;
