import PropTypes from "prop-types";
import { Form } from "antd";
const { Item } = Form;

const InputWrapper = ({ label, input, name }) => {
  return (
    <div className={`input ${name}`}>
      <div className="input-label">{label}</div>
      <Item
        rules={[{ required: true, message: "Este campo es requerido" }]}
        name={name}
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
};

export default InputWrapper;
