import classnames from 'classnames';

import styles from './FileInput.module.css';

const FileInput = ({ children, ondrop, inputRef, ...rest }) => (
  <label
    class={classnames({
      [styles.fileInput]: true,
      [styles.input]: true
    })}
    ondrop={ondrop}
    ondragover={(e) => e.preventDefault()}
  >
    {children}
    <input type="file" ref={inputRef} {...rest} />
  </label>
);

export default FileInput;
