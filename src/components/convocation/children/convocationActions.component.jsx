import { useState } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { Button, DatePicker, Form, Input, Modal, Popconfirm, Space } from "antd";
import {
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  LockOutlined,
  StopOutlined,
  UnlockOutlined,
} from "@ant-design/icons";
import {
  cancelConvocation,
  closeConvocation,
  deleteConvocation,
  finishConvocation,
  reopenConvocation,
} from "../../../services/convocation.service";
import { CONVOCATION_ACTIONS_BY_STATE } from "../../../constants/convocation.constant";

const DATE_FORMAT = "YYYY-MM-DD";

// Buttons for the actions the current state allows; each transition is validated again by the api.
const ConvocationActions = ({ convocation, onChanged, onEdit, onDeleted, onError }) => {
  const [busy, setBusy] = useState(false);
  const [modal, setModal] = useState(null);
  const [form] = Form.useForm();
  const allowed = CONVOCATION_ACTIONS_BY_STATE[convocation.state] ?? [];

  const run = async (action, successMessage) => {
    setBusy(true);
    try {
      const updated = await action();
      setModal(null);
      onChanged(updated, successMessage);
    } catch (error) {
      onError(error.message);
    } finally {
      setBusy(false);
    }
  };

  const confirmDelete = async () => {
    setBusy(true);
    try {
      await deleteConvocation(convocation.id);
      onDeleted();
    } catch (error) {
      onError(error.message);
      setBusy(false);
    }
  };

  const submitModal = async () => {
    let values;
    try {
      values = await form.validateFields();
    } catch {
      return; // The form already shows the field errors.
    }
    if (modal === "reopen") {
      await run(() => reopenConvocation(convocation.id, values.endDate.format(DATE_FORMAT)), "Convocatoria reabierta");
    } else {
      await run(() => cancelConvocation(convocation.id, values.reason), "Convocatoria cancelada");
    }
  };

  return (
    <Space wrap>
      {allowed.includes("edit") && (
        <Button type="primary" icon={<EditOutlined />} onClick={() => onEdit(convocation)}>
          Editar
        </Button>
      )}
      {allowed.includes("close") && (
        <Popconfirm
          title="¿Cerrar esta convocatoria?"
          description="Dejará de recibir solicitudes y se podrán decidir las recibidas."
          okText="Cerrar"
          cancelText="Volver"
          onConfirm={() => run(() => closeConvocation(convocation.id), "Convocatoria cerrada")}
        >
          <Button icon={<LockOutlined />} loading={busy}>
            Cerrar
          </Button>
        </Popconfirm>
      )}
      {allowed.includes("reopen") && (
        <Button icon={<UnlockOutlined />} onClick={() => setModal("reopen")}>
          Reabrir
        </Button>
      )}
      {allowed.includes("finish") && (
        <Popconfirm
          title="¿Finalizar esta convocatoria?"
          description="Quedará solo para consulta. Todas sus solicitudes deben estar decididas."
          okText="Finalizar"
          cancelText="Volver"
          onConfirm={() => run(() => finishConvocation(convocation.id), "Convocatoria finalizada")}
        >
          <Button icon={<CheckCircleOutlined />} loading={busy}>
            Finalizar
          </Button>
        </Popconfirm>
      )}
      {allowed.includes("cancel") && (
        <Button danger icon={<StopOutlined />} onClick={() => setModal("cancel")}>
          Cancelar convocatoria
        </Button>
      )}
      {allowed.includes("delete") && (
        <Popconfirm
          title="¿Eliminar esta convocatoria?"
          description="También se eliminarán sus requisitos. Esta acción no se puede deshacer."
          okText="Eliminar"
          cancelText="Volver"
          okButtonProps={{ danger: true, loading: busy }}
          onConfirm={confirmDelete}
        >
          <Button danger icon={<DeleteOutlined />}>
            Eliminar
          </Button>
        </Popconfirm>
      )}

      <Modal
        open={modal !== null}
        title={modal === "reopen" ? "Reabrir convocatoria" : "Cancelar convocatoria"}
        okText={modal === "reopen" ? "Reabrir" : "Cancelar convocatoria"}
        cancelText="Volver"
        okButtonProps={{ danger: modal === "cancel", loading: busy }}
        onOk={submitModal}
        onCancel={() => setModal(null)}
        afterClose={() => form.resetFields()}
        destroyOnHidden
      >
        <Form form={form} layout="vertical" preserve={false}>
          {modal === "reopen" ? (
            <Form.Item
              name="endDate"
              label="Nueva fecha de fin"
              extra="La convocatoria vuelve a recibir solicitudes hasta esta fecha."
              rules={[{ required: true, message: "Seleccione la nueva fecha de fin" }]}
            >
              <DatePicker format={DATE_FORMAT} disabledDate={(date) => !date.isAfter(dayjs(), "day")} style={{ width: "100%" }} />
            </Form.Item>
          ) : (
            <Form.Item
              name="reason"
              label="Justificación"
              extra="Se mostrará en la convocatoria y se notificará a los estudiantes con solicitudes."
              rules={[
                { required: true, whitespace: true, message: "La justificación es obligatoria" },
                { max: 500, message: "Máximo 500 caracteres" },
              ]}
            >
              <Input.TextArea rows={4} placeholder="Explique por qué se cancela la convocatoria" />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </Space>
  );
};

ConvocationActions.propTypes = {
  convocation: PropTypes.object.isRequired,
  onChanged: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDeleted: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
};

export default ConvocationActions;
