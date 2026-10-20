import { useState } from "react";
import PropTypes from "prop-types";
import { Alert, Button, Form, Input, Modal, Popconfirm, Space } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { approveRequest, rejectRequest } from "../../../services/request.service";
import { REJECTION_COMMENT_MAX_LENGTH } from "../../../constants/request.constant";
import { CONVOCATION_STATE_LABELS } from "../../../constants/convocation.constant";

// Approve or reject a request that was not decided yet (#17). The api checks the same rules.
const RequestDecision = ({ request, onDecided, onError }) => {
  const [busy, setBusy] = useState(false);
  const [rejecting, setRejecting] = useState(false);
  const [form] = Form.useForm();
  const convocationClosed = request.convocationState === "CLOSED";

  const decide = async (action, successMessage) => {
    setBusy(true);
    try {
      const updated = await action();
      setRejecting(false);
      onDecided(updated, successMessage);
    } catch (error) {
      onError(error.message);
      if (error.fieldErrors?.comment) form.setFields([{ name: "comment", errors: [error.fieldErrors.comment] }]);
    } finally {
      setBusy(false);
    }
  };

  const submitRejection = () =>
    form
      .validateFields()
      .then(({ comment }) => decide(() => rejectRequest(request.id, comment), "Solicitud rechazada"))
      .catch(() => {});

  return (
    <div className="request-decision">
      {!convocationClosed && (
        <Alert
          className="request-review__error"
          type="info"
          showIcon
          title={
            request.convocationState === "OPEN"
              ? "La convocatoria sigue abierta: ciérrela para poder aprobar o rechazar sus solicitudes."
              : `No se pueden decidir solicitudes de una convocatoria ${(CONVOCATION_STATE_LABELS[request.convocationState] ?? "").toLowerCase()}.`
          }
        />
      )}
      <Space>
        <Popconfirm
          title="¿Aprobar la solicitud?"
          description={`Se aprobará la solicitud de ${request.student.name}.`}
          okText="Aprobar"
          cancelText="Cancelar"
          disabled={!convocationClosed}
          onConfirm={() => decide(() => approveRequest(request.id), "Solicitud aprobada")}
        >
          <Button type="primary" icon={<CheckOutlined />} loading={busy && !rejecting} disabled={!convocationClosed}>
            Aprobar
          </Button>
        </Popconfirm>
        <Button danger icon={<CloseOutlined />} disabled={!convocationClosed} onClick={() => setRejecting(true)}>
          Rechazar
        </Button>
      </Space>

      <Modal
        title="Rechazar solicitud"
        open={rejecting}
        okText="Rechazar"
        okButtonProps={{ danger: true, loading: busy }}
        cancelText="Cancelar"
        onOk={submitRejection}
        onCancel={() => setRejecting(false)}
        afterClose={() => form.resetFields()}
        destroyOnHidden
      >
        <p>El estudiante verá esta justificación junto con el estado de su solicitud.</p>
        <Form form={form} layout="vertical">
          <Form.Item
            name="comment"
            label="Justificación del rechazo"
            rules={[
              { required: true, message: "La justificación del rechazo es obligatoria" },
              { whitespace: true, message: "La justificación del rechazo es obligatoria" },
              { max: REJECTION_COMMENT_MAX_LENGTH, message: `Máximo ${REJECTION_COMMENT_MAX_LENGTH} caracteres` },
            ]}
          >
            <Input.TextArea id="rejection-comment" rows={4} showCount maxLength={REJECTION_COMMENT_MAX_LENGTH} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

RequestDecision.propTypes = {
  request: PropTypes.object.isRequired,
  onDecided: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
};

export default RequestDecision;
