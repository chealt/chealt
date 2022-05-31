import classnames from 'classnames';

import inputStyles from './Input.module.css';
import styles from './FileInput.module.css';

const FileInput = ({ children, ondrop, inputRef, ...rest }) => (
  <label class={styles.fileInput} ondrop={ondrop} ondragover={(e) => e.preventDefault()}>
    {children}
    <input type="file" class={classnames(inputStyles.input)} ref={inputRef} {...rest} />
  </label>
);

export default FileInput;
