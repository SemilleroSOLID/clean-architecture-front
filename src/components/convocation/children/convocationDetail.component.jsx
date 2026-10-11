import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Card, Descriptions, Popconfirm, Result, Space, Spin, Table, Tag, message } from "antd";
import { ArrowLeftOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { deleteConvocation, getConvocationById } from "../../../services/convocation.service";
import { getTypeRequirement } from "../../../services/requirement.service";
import {
  CONDITION_LABELS,
  CONVOCATION_STATE_LABELS,
  CONVOCATION_TYPE_LABELS,
} from "../../../constants/convocation.constant";

const formatDate = (date) => (date ? date.split("-").reverse().join("/") : "-");

const ConvocationDetail = ({ convocationId, onBack, onEdit, onDeleted }) => {
  const [convocation, setConvocation] = useState(null);
  const [requirementTypes, setRequirementTypes] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const confirmDelete = async () => {
    setDeleting(true);
    try {
      await deleteConvocation(convocationId);
      onDeleted();
    } catch (deleteError) {
      messageApi.error(deleteError.message);
      setDeleting(false);
    }
  };

  useEffect(() => {
    let ignore = false;
    Promise.all([getConvocationById(convocationId), getTypeRequirement()])
      .then(([convocationData, types]) => {
        if (ignore) return;
        setConvocation(convocationData);
        setRequirementTypes(
          Object.fromEntries(types.map(({ id, requirementName }) => [id, requirementName]))
        );
      })
      .catch((fetchError) => !ignore && setError(fetchError.message))
      .finally(() => !ignore && setLoading(false));
    return () => {
      ignore = true;
    };
  }, [convocationId]);

  const backButton = (
    <Button icon={<ArrowLeftOutlined />} onClick={onBack}>
      Volver a la lista
    </Button>
  );

  if (loading) {
    return (
      <div className="convocation-detail__loading">
        <Spin />
      </div>
    );
  }

  if (error) {
    return (
      <Card className="convocation-detail">
        <Result status="404" title="Convocatoria no encontrada" subTitle={error} extra={backButton} />
      </Card>
    );
  }

  const requirementColumns = [
    {
      title: "Tipo de requisito",
      dataIndex: "requirementId",
      render: (requirementId) => requirementTypes[requirementId] ?? "-",
    },
    { title: "Nombre", dataIndex: "name" },
    {
      title: "Condición",
      dataIndex: "conditional",
      render: (conditional) => CONDITION_LABELS[conditional] ?? conditional,
    },
    { title: "Valor requerido", dataIndex: "requiredValue" },
    { title: "Descripción", dataIndex: "description", render: (text) => text || "-" },
  ];

  const detailItems = [
    { key: "type", label: "Tipo", children: CONVOCATION_TYPE_LABELS[convocation.type] ?? convocation.type },
    {
      key: "state",
      label: "Estado",
      children: (
        <Tag color={convocation.state === "OPEN" ? "green" : "default"}>
          {CONVOCATION_STATE_LABELS[convocation.state] ?? convocation.state}
        </Tag>
      ),
    },
    { key: "startDate", label: "Fecha de inicio", children: formatDate(convocation.startDate) },
    { key: "endDate", label: "Fecha de fin", children: formatDate(convocation.endDate) },
    { key: "description", label: "Descripción", span: 2, children: convocation.description || "-" },
  ];

  return (
    <Card
      className="convocation-detail"
      title={convocation.title}
      extra={
        <Space>
          {contextHolder}
          <Button type="primary" icon={<EditOutlined />} onClick={() => onEdit(convocation)}>
            Editar
          </Button>
          <Popconfirm
            title="¿Eliminar esta convocatoria?"
            description="También se eliminarán sus requisitos. Esta acción no se puede deshacer."
            okText="Eliminar"
            cancelText="Cancelar"
            okButtonProps={{ danger: true, loading: deleting }}
            onConfirm={confirmDelete}
          >
            <Button danger icon={<DeleteOutlined />}>
              Eliminar
            </Button>
          </Popconfirm>
          {backButton}
        </Space>
      }
    >
      <Descriptions bordered column={2} items={detailItems} />
      <div className="convocation-detail__subtitle">Requisitos</div>
      <Table
        rowKey="id"
        size="small"
        pagination={false}
        columns={requirementColumns}
        dataSource={convocation.convocationRequirements}
        locale={{ emptyText: "Esta convocatoria no tiene requisitos" }}
      />
    </Card>
  );
};

ConvocationDetail.propTypes = {
  convocationId: PropTypes.number.isRequired,
  onBack: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDeleted: PropTypes.func.isRequired,
};

export default ConvocationDetail;
