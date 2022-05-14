import styles from './FileInput.module.css';

const FileInput = ({ children, ondrop, ...rest }) => (
  <label class={styles.fileInput} ondrop={ondrop} ondragover={(e) => e.preventDefault()}>
    {children}
    <input type="file" {...rest} />
  </label>
);

export default FileInput;
