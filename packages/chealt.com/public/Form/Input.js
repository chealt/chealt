const Input = ({ children, ...inputProps }) => (
  <label>
    {children}
    <input {...inputProps} />
  </label>
);

export default Input;
