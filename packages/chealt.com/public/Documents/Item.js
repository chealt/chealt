import Input from '../Form/Input';

const Item = ({ key, children, ...inputProps }) => (
  <Input type="checkbox" value={key} {...inputProps}>
    {children}
  </Input>
);

export default Item;
