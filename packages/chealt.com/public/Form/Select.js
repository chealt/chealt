const Select = ({ children, label, selectProps }) => (
  <label>
    {label}
    <select {...selectProps}>{children}</select>
  </label>
);

export default Select;
