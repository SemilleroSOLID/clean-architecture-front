import PropTypes from "prop-types";
import { Form } from "antd";
const { Item } = Form;

const REQUIRED_RULE = { required: true, message: "Este campo es requerido" };

const InputWrapper = ({ label, input, name, className, rules = [], optional = false, dependencies }) => {
  return (
    <div className={`input ${className}`}>
      {label && <div className="input-label">{label}</div>}
      <Item
        rules={optional ? rules : [REQUIRED_RULE, ...rules]}
        name={name}
        dependencies={dependencies}
      >
        {input}
      </Item>
    </div>
  );
};
InputWrapper.propTypes = {
  input: PropTypes.node,
  label: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string,
  rules: PropTypes.array,
  optional: PropTypes.bool,
  dependencies: PropTypes.array,
};

export default InputWrapper;
