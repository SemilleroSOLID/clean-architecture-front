import PropTypes from "prop-types";
import { Descriptions, Table } from "antd";
import { CONVOCATION_TYPE_LABELS } from "../../../constants/convocation.constant";
import { formatDate } from "../../../utils/date.util";
import { describeCondition } from "../../../utils/request.util";

const REQUIREMENT_COLUMNS = [
  { title: "Requisito", dataIndex: "name" },
  { title: "Se exige", key: "condition", render: (_, requirement) => describeCondition(requirement) },
  { title: "Descripción", dataIndex: "description", render: (text) => text || "-" },
];

// Information and requirements of the convocation the student is applying to.
const ConvocationSummary = ({ convocation }) => {
  const items = [
    { key: "type", label: "Tipo", children: CONVOCATION_TYPE_LABELS[convocation.type] ?? convocation.type },
    { key: "dates", label: "Recibe solicitudes", children: `${formatDate(convocation.startDate)} al ${formatDate(convocation.endDate)}` },
    { key: "description", label: "Descripción", span: 2, children: convocation.description || "-" },
  ];

  return (
    <>
      <Descriptions bordered size="small" column={2} items={items} />
      <div className="request__subtitle">Requisitos</div>
      <Table
        rowKey="id"
        size="small"
        pagination={false}
        columns={REQUIREMENT_COLUMNS}
        dataSource={convocation.convocationRequirements}
        locale={{ emptyText: "Esta convocatoria no tiene requisitos" }}
      />
    </>
  );
};

ConvocationSummary.propTypes = {
  convocation: PropTypes.object.isRequired,
};

export default ConvocationSummary;
