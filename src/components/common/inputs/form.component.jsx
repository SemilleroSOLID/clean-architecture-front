import PropTypes from "prop-types";
import { Form, Button } from "antd";
import InputWrapper from "./inputWrapper.component";

const CommonForm = ({ inputItems, extra, showSubmit = false, ...props }) => {
  return (
    <Form {...props} >
      {inputItems.map(
        ({ component: Input, childrenProps, ...props }, index) => (
          <InputWrapper
            input={<Input {...childrenProps} />}
            key={index}
            {...props}
          />
        )
      )}
      {extra}
      {showSubmit && (
        <Form.Item className="submit ">
          <Button type="primary" htmlType="submit" className="common_button">
            submit
          </Button>
        </Form.Item>
      )}
    </Form>
  );
};
CommonForm.propTypes = {
  inputItems: PropTypes.array,
  extra: PropTypes.node,
  showSubmit: PropTypes.bool,
};

export default CommonForm;
