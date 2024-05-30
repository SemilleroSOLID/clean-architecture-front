import { Form, Button } from "antd";
import { CREATE_CONVOCATION } from "../../../schema/createConvocation.schema";
import InputWrapper from "../../common/inputs/inputWrapper.component";
import {DoubleRightOutlined} from '@ant-design/icons';

const CreateConvocation = () => {
  return (
    <Form
      onFinish={(data) => {
        console.log(data);
      }}
      className="convocation-create"
    >
      {CREATE_CONVOCATION.map(
        ({ component: Input, childrenProps, ...props }, index) => (
          <InputWrapper
            input={<Input {...childrenProps} />}
            key={index}
            {...props}
          />
        )
      )}
      <Button className="requirements" icon={<DoubleRightOutlined />} iconPosition="end">
        Agregar requisito 
      </Button>
      <Form.Item>
        {/* <Button type="primary" htmlType="submit" className="submit">
          submit
        </Button> */}
      </Form.Item>
    </Form>
  );
};

export default CreateConvocation;
