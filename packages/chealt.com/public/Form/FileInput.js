const FileInput = ({ children, ...rest }) => (
  <label>
    {children}
    <input type="file" {...rest} />
  </label>
);

export default FileInput;
