import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Alert, Button, Card, Descriptions, Result, Spin, Table, Tag, message } from "antd";
import { ArrowLeftOutlined, CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { getRequestById } from "../../../services/request.service";
import { REQUEST_STATE_COLORS, REQUEST_STATE_LABELS, UNDECIDED_REQUEST_STATES } from "../../../constants/request.constant";
import {
  CONVOCATION_STATE_COLORS,
  CONVOCATION_STATE_LABELS,
  CONVOCATION_TYPE_LABELS,
} from "../../../constants/convocation.constant";
import { formatDate } from "../../../utils/date.util";
import { describeCondition } from "../../../utils/request.util";
import RequestDecision from "./requestDecision.component";

const REQUIREMENT_COLUMNS = [
  { title: "Requisito", dataIndex: "name" },
  { title: "Se exige", key: "condition", render: (_, requirement) => describeCondition(requirement) },
  { title: "Valor del estudiante", dataIndex: "value", render: (value) => value ?? "-" },
  {
    title: "Adjunto",
    dataIndex: "attachment",
    render: (attachment) =>
      attachment ? (
        <a href={attachment} target="_blank" rel="noreferrer">
          Ver adjunto
        </a>
      ) : (
        "-"
      ),
  },
  {
    title: "¿Cumple?",
    dataIndex: "met",
    render: (met) =>
      met ? (
        <Tag color="green" icon={<CheckCircleOutlined />}>
          Cumple
        </Tag>
      ) : (
        <Tag color="red" icon={<CloseCircleOutlined />}>
          No cumple
        </Tag>
      ),
  },
];

// A request requirement by requirement: what the convocation requires, what the student gave and if it is met.
const RequestDetail = ({ requestId, onBack }) => {
  const [request, setRequest] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();

  const onDecided = (updatedRequest, successMessage) => {
    setRequest(updatedRequest);
    messageApi.success(successMessage);
  };

  useEffect(() => {
    let ignore = false;
    getRequestById(requestId)
      .then((data) => !ignore && setRequest(data))
      .catch((fetchError) => !ignore && setError(fetchError.message))
      .finally(() => !ignore && setLoading(false));
    return () => {
      ignore = true;
    };
  }, [requestId]);

  const backButton = (
    <Button icon={<ArrowLeftOutlined />} onClick={onBack}>
      Volver a la lista
    </Button>
  );

  if (loading) {
    return (
      <Card className="request">
        <div className="request__loading">
          <Spin />
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="request">
        <Result status="404" title="Solicitud no encontrada" subTitle={error} extra={backButton} />
      </Card>
    );
  }

  const { student } = request;
  const metCount = request.requirements.filter(({ met }) => met).length;
  const unmetNames = request.requirements.filter(({ met }) => !met).map(({ name }) => name);
  const undecided = UNDECIDED_REQUEST_STATES.includes(request.state);
  const total = request.requirements.length;
  const items = [
    { key: "student", label: "Estudiante", children: student.name },
    { key: "email", label: "Correo", children: student.email },
    { key: "program", label: "Programa", children: student.program },
    { key: "average", label: "Promedio / estrato", children: `${student.average} / ${student.stratum}` },
    {
      key: "convocation",
      label: "Convocatoria",
      children: (
        <>
          {request.convocationTitle} ({CONVOCATION_TYPE_LABELS[request.convocationType] ?? request.convocationType}){" "}
          <Tag color={CONVOCATION_STATE_COLORS[request.convocationState] ?? "default"}>
            {CONVOCATION_STATE_LABELS[request.convocationState] ?? request.convocationState}
          </Tag>
        </>
      ),
    },
    { key: "date", label: "Fecha de la solicitud", children: formatDate(request.creationDate) },
    {
      key: "state",
      label: "Estado de la solicitud",
      span: 2,
      children: (
        <Tag color={REQUEST_STATE_COLORS[request.state] ?? "default"}>{REQUEST_STATE_LABELS[request.state] ?? request.state}</Tag>
      ),
    },
  ];

  return (
    <Card className="request" title={`Solicitud #${request.id}`} extra={backButton}>
      {contextHolder}
      {undecided && (
        <RequestDecision request={request} onDecided={onDecided} onError={(errorMessage) => messageApi.error(errorMessage)} />
      )}
      {request.state === "REJECT" && (
        <Alert
          className="request-review__error"
          type="error"
          showIcon
          title="Justificación del rechazo"
          description={request.comment}
        />
      )}
      {request.state === "ACCEPT" && (
        <Alert className="request-review__error" type="success" showIcon title="La solicitud fue aprobada" />
      )}
      <Descriptions bordered size="small" column={2} items={items} />
      <div className="request__subtitle">Verificación de requisitos</div>
      <Alert
        className="request-review__error"
        type={metCount === total ? "success" : "warning"}
        showIcon
        title={
          metCount === total
            ? `Cumple los ${total} requisitos de la convocatoria`
            : `Cumple ${metCount} de ${total} requisitos de la convocatoria`
        }
        description={
          metCount === total
            ? undefined
            : `No cumple: ${unmetNames.join(", ")}.${undecided ? " Revise estos requisitos antes de decidir." : ""}`
        }
      />
      <Table
        rowKey="convocationRequirementId"
        size="small"
        pagination={false}
        columns={REQUIREMENT_COLUMNS}
        dataSource={request.requirements}
        rowClassName={({ met }) => (met ? "" : "request-admin__unmet")}
      />
    </Card>
  );
};

RequestDetail.propTypes = {
  requestId: PropTypes.number.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default RequestDetail;
