import PropTypes from "prop-types";
import { Form } from "antd";
const { Item } = Form;

const InputWrapper = ({ label, input, name }) => {
  return (
    <div className="input">
      <div className="input__label">{label}</div>
      <Item name={name}>{input}</Item>
    </div>
  );
};
InputWrapper.propTypes = {
  input: PropTypes.node,
  label: PropTypes.string,
  name: PropTypes.string,
};

export default InputWrapper;
