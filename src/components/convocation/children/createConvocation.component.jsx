import { useState } from "react";
import { CREATE_CONVOCATION } from "../../../schema/createConvocation.schema";
import CommonForm from "../../common/inputs/form.component";
import { Button, Card } from "antd";
import {
  DiffOutlined,
  EditOutlined,
  FileTextOutlined,
  ExclamationCircleOutlined,
  BranchesOutlined,
} from "@ant-design/icons";
import { isEmpty } from "lodash";

const CreateConvocation = () => {
  const [requirements, setRequirements] = useState([]);
  return (
    <>
      <div className="convocation-content">
        <CommonForm
          onFinish={(data) => {
            console.log(data);
          }}
          // form={form}
          id={"convocation-create"}
          onValuesChange={({ requirements }) => {
            requirements && setRequirements(requirements);
          }}
          className="convocation-create"
          showSubmit={false}
          inputItems={CREATE_CONVOCATION}
        />
      </div>

      <div className="convocation-content requirement-create__section">
        {!isEmpty(requirements) &&
          requirements.map(
            ({ name, requiredValue, conditional, description }, index) => (
              <Card key={index} className="requirement-create__card">
                <DiffOutlined className="requirement-create__card--icon" />
                <div className="requirement-create__card--name">
                  <EditOutlined />
                  {name}
                </div>
                <div className="requirement-create__card--requiredValue">
                  <ExclamationCircleOutlined />
                  {requiredValue}
                </div>
                <div className="requirement-create__card--conditional">
                  <BranchesOutlined /> {conditional}
                </div>
                <div className="requirement-create__card--description">
                  <FileTextOutlined /> {description}
                </div>
              </Card>
            )
          )}
      </div>
      <div className="convocation-content__basic ">
        <Button
          type="primary"
          htmlType="submit"
          className="common_button"
          style={{ width: 300 }}
          form={"convocation-create"}
        >
          Enviar formulario
        </Button>
      </div>
    </>
  );
};

export default CreateConvocation;
