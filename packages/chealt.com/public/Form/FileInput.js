import styles from './FileInput.module.css';

const FileInput = ({ children, ondrop, inputRef, ...rest }) => (
  <label class={styles.fileInput} ondrop={ondrop} ondragover={(e) => e.preventDefault()}>
    {children}
    <input type="file" ref={inputRef} {...rest} />
  </label>
);

export default FileInput;
