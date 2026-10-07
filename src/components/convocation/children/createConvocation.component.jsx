import { useCallback, useEffect, useRef, useState } from "react";
import { CREATE_CONVOCATION } from "../../../schema/createConvocation.schema";
import CommonForm from "../../common/inputs/form.component";
import { Button, Card, Form, message } from "antd";
import {
  DiffOutlined,
  EditOutlined,
  FileTextOutlined,
  ExclamationCircleOutlined,
  BranchesOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { isEmpty } from "lodash";
import { createConvocation } from "../../../services/convocation.service";
import { getTypeRequirement } from "../../../services/requirement.service";
import { CONDITION_LABELS } from "../../../constants/convocation.constant";

const DATE_FORMAT = "YYYY-MM-DD";
const FORM_FIELDS = CREATE_CONVOCATION.map(({ name }) => name);

const CreateConvocation = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [saving, setSaving] = useState(false);
  const savingRef = useRef(false);
  const [requirementTypes, setRequirementTypes] = useState({});
  const requirements = Form.useWatch("convocationRequirements", form) ?? [];

  useEffect(() => {
    getTypeRequirement()
      .then((types) =>
        setRequirementTypes(Object.fromEntries(types.map(({ id, requirementName }) => [id, requirementName])))
      )
      .catch((error) => console.log(error));
  }, []);

  const removeRequirement = useCallback(
    (indexToRemove) => {
      const remaining = (form.getFieldValue("convocationRequirements") ?? []).filter(
        (_, index) => index !== indexToRemove
      );
      form.setFieldValue("convocationRequirements", remaining);
      form.validateFields(["convocationRequirements"]).catch(() => {});
    },
    [form]
  );

  const handleFinish = useCallback(
    async ({ startDate, endDate, ...convocation }) => {
      if (savingRef.current) return;
      savingRef.current = true;
      setSaving(true);
      try {
        await createConvocation({
          ...convocation,
          startDate: startDate.format(DATE_FORMAT),
          endDate: endDate.format(DATE_FORMAT),
        });
        messageApi.success("Convocatoria guardada");
        form.resetFields();
      } catch (error) {
        messageApi.error(error.message);
        const fieldErrors = Object.entries(error.fieldErrors ?? {})
          .filter(([field]) => FORM_FIELDS.includes(field))
          .map(([field, fieldMessage]) => ({ name: field, errors: [fieldMessage] }));
        form.setFields(fieldErrors);
      } finally {
        savingRef.current = false;
        setSaving(false);
      }
    },
    [form, messageApi]
  );

  return (
    <>
      {contextHolder}
      <div className="convocation-content">
        <CommonForm
          form={form}
          onFinish={handleFinish}
          id={"convocation-create"}
          className="convocation-create"
          inputItems={CREATE_CONVOCATION}
        />
      </div>

      {!isEmpty(requirements) && (
        <div className="convocation-content requirement-create__section">
          {requirements.map(
            ({ name, requiredValue, conditional, description, requirementId }, index) => (
              <Card key={index} className="requirement-create__card">
                <DiffOutlined className="requirement-create__card--icon" />
                <div className="requirement-create__card--name">
                  <EditOutlined />
                  {name}
                  {requirementTypes[requirementId] && (
                    <div className="requirement-create__card--type">{requirementTypes[requirementId]}</div>
                  )}
                </div>
                <div className="requirement-create__card--requiredValue">
                  <ExclamationCircleOutlined />
                  {requiredValue}
                </div>
                <div className="requirement-create__card--conditional">
                  <BranchesOutlined /> {CONDITION_LABELS[conditional] ?? conditional}
                </div>
                <div className="requirement-create__card--description">
                  <FileTextOutlined /> {description || "Sin descripción"}
                </div>
                <Button
                  className="requirement-create__card--remove"
                  type="text"
                  danger
                  size="small"
                  icon={<DeleteOutlined />}
                  aria-label={`Quitar requisito ${name}`}
                  onClick={() => removeRequirement(index)}
                />
              </Card>
            )
          )}
        </div>
      )}
      <div className="convocation-content__basic ">
        <Button
          type="primary"
          htmlType="submit"
          className="common_button"
          style={{ width: 300 }}
          form={"convocation-create"}
          loading={saving}
        >
          Enviar formulario
        </Button>
      </div>
    </>
  );
};

export default CreateConvocation;
