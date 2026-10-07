import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
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
import {
  buildConvocationFormItems,
  CONVOCATION_FORM_FIELDS,
} from "../../../schema/createConvocation.schema";
import CommonForm from "../../common/inputs/form.component";
import RequirementModal from "../../requirement/requirementModal.component";
import { createConvocation, updateConvocation } from "../../../services/convocation.service";
import { getTypeRequirement } from "../../../services/requirement.service";
import { CONDITION_LABELS, CONVOCATION_TYPE_IDS } from "../../../constants/convocation.constant";

const DATE_FORMAT = "YYYY-MM-DD";

const toFormValues = (convocation) => ({
  title: convocation.title,
  type: CONVOCATION_TYPE_IDS[convocation.type],
  description: convocation.description,
  startDate: dayjs(convocation.startDate),
  endDate: dayjs(convocation.endDate),
  convocationRequirements: convocation.convocationRequirements.map(
    ({ id, name, requiredValue, conditional, description, requirementId }) => ({
      id,
      name,
      requiredValue,
      conditional,
      description,
      requirementId,
    })
  ),
});

// Creates a convocation, or edits the one received in "convocation".
const ConvocationForm = ({ convocation = null, onSaved, onCancel }) => {
  const isEditing = convocation !== null;
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [saving, setSaving] = useState(false);
  const savingRef = useRef(false);
  const [requirementTypes, setRequirementTypes] = useState({});
  const [requirementModal, setRequirementModal] = useState({ open: false, index: null });
  const requirements = Form.useWatch("convocationRequirements", form) ?? [];

  const initialValues = useMemo(() => (isEditing ? toFormValues(convocation) : undefined), [isEditing, convocation]);

  useEffect(() => {
    getTypeRequirement()
      .then((types) =>
        setRequirementTypes(Object.fromEntries(types.map(({ id, requirementName }) => [id, requirementName])))
      )
      .catch((error) => console.log(error));
  }, []);

  const openNewRequirement = useCallback(() => setRequirementModal({ open: true, index: null }), []);
  const closeRequirementModal = useCallback(() => setRequirementModal({ open: false, index: null }), []);

  const formItems = useMemo(
    () =>
      buildConvocationFormItems({
        onAddRequirement: openNewRequirement,
        originalStartDate: initialValues?.startDate ?? null,
      }),
    [openNewRequirement, initialValues]
  );

  const setRequirements = useCallback(
    (nextRequirements) => {
      form.setFieldValue("convocationRequirements", nextRequirements);
      form.validateFields(["convocationRequirements"]).catch(() => {});
    },
    [form]
  );

  const saveRequirement = useCallback(
    (requirement) => {
      const current = form.getFieldValue("convocationRequirements") ?? [];
      const { index } = requirementModal;
      setRequirements(
        index === null
          ? [...current, requirement]
          : current.map((item, itemIndex) => (itemIndex === index ? { ...item, ...requirement } : item))
      );
      closeRequirementModal();
    },
    [form, requirementModal, setRequirements, closeRequirementModal]
  );

  const removeRequirement = useCallback(
    (indexToRemove) =>
      setRequirements((form.getFieldValue("convocationRequirements") ?? []).filter((_, index) => index !== indexToRemove)),
    [form, setRequirements]
  );

  const handleFinish = useCallback(
    async ({ startDate, endDate, ...values }) => {
      if (savingRef.current) return;
      savingRef.current = true;
      setSaving(true);
      const payload = { ...values, startDate: startDate.format(DATE_FORMAT), endDate: endDate.format(DATE_FORMAT) };
      try {
        const saved = isEditing ? await updateConvocation(convocation.id, payload) : await createConvocation(payload);
        if (isEditing) {
          onSaved?.(saved);
        } else {
          messageApi.success("Convocatoria guardada");
          form.resetFields();
          onSaved?.(saved);
        }
      } catch (error) {
        messageApi.error(error.message);
        const fieldErrors = Object.entries(error.fieldErrors ?? {})
          .filter(([field]) => CONVOCATION_FORM_FIELDS.includes(field))
          .map(([field, fieldMessage]) => ({ name: field, errors: [fieldMessage] }));
        form.setFields(fieldErrors);
      } finally {
        savingRef.current = false;
        setSaving(false);
      }
    },
    [form, messageApi, isEditing, convocation, onSaved]
  );

  const editingRequirement =
    requirementModal.index === null ? undefined : requirements[requirementModal.index];

  return (
    <>
      {contextHolder}
      <div className="convocation-content">
        {isEditing && <div className="convocation-form__title">Editar convocatoria</div>}
        <CommonForm
          form={form}
          initialValues={initialValues}
          onFinish={handleFinish}
          id={"convocation-create"}
          className="convocation-create"
          inputItems={formItems}
        />
      </div>

      <RequirementModal
        key={requirementModal.open ? `requirement-${requirementModal.index}` : "requirement-closed"}
        open={requirementModal.open}
        initialValues={editingRequirement}
        onSubmit={saveRequirement}
        onCancel={closeRequirementModal}
      />

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
                <div className="requirement-create__card--actions">
                  <Button
                    type="text"
                    size="small"
                    icon={<EditOutlined />}
                    aria-label={`Editar requisito ${name}`}
                    onClick={() => setRequirementModal({ open: true, index })}
                  />
                  <Button
                    type="text"
                    danger
                    size="small"
                    icon={<DeleteOutlined />}
                    aria-label={`Quitar requisito ${name}`}
                    onClick={() => removeRequirement(index)}
                  />
                </div>
              </Card>
            )
          )}
        </div>
      )}
      <div className="convocation-content__basic convocation-form__actions">
        {isEditing && (
          <Button className="common_button" style={{ width: 200 }} onClick={onCancel} disabled={saving}>
            Cancelar
          </Button>
        )}
        <Button
          type="primary"
          htmlType="submit"
          className="common_button"
          style={{ width: 300 }}
          form={"convocation-create"}
          loading={saving}
        >
          {isEditing ? "Guardar cambios" : "Enviar formulario"}
        </Button>
      </div>
    </>
  );
};

ConvocationForm.propTypes = {
  convocation: PropTypes.object,
  onSaved: PropTypes.func,
  onCancel: PropTypes.func,
};

export default ConvocationForm;
