import { Form, Button, Input } from "antd";

const CreateConvocation = () => {
  return (
    <div className="convocation-create">
      <Form
        onFinish={(data) => {
          console.log(data);
        }}
      >
        <Form.Item
          name="convocationName"
          // label="Nombre de la convocatoria"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateConvocation;
