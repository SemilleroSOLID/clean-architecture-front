import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Alert, Button, Card, Select, Table, Tag } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { getAllRequests } from "../../../services/request.service";
import { getAllConvocations } from "../../../services/convocation.service";
import { REQUEST_STATE_COLORS, REQUEST_STATE_LABELS } from "../../../constants/request.constant";
import { formatDate } from "../../../utils/date.util";

const STATE_OPTIONS = Object.entries(REQUEST_STATE_LABELS).map(([value, label]) => ({ value, label }));

// Table of requests filtered by convocation and state; the filters are applied by the api.
const ListRequests = ({ onSelect }) => {
  const [convocations, setConvocations] = useState([]);
  const [requests, setRequests] = useState([]);
  const [filters, setFilters] = useState({ convocationId: undefined, state: undefined });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllConvocations()
      .then(setConvocations)
      .catch((fetchError) => setError(fetchError.message));
  }, []);

  useEffect(() => {
    let ignore = false;
    getAllRequests(filters)
      .then((data) => {
        if (ignore) return;
        setRequests(data);
        setError(null);
      })
      .catch((fetchError) => !ignore && setError(fetchError.message))
      .finally(() => !ignore && setLoading(false));
    return () => {
      ignore = true;
    };
  }, [filters]);

  const changeFilter = (key, value) => {
    setLoading(true);
    setFilters((current) => ({ ...current, [key]: value }));
  };

  const columns = [
    { title: "Estudiante", dataIndex: "studentName" },
    { title: "Convocatoria", dataIndex: "convocationTitle" },
    { title: "Fecha", dataIndex: "creationDate", render: formatDate },
    {
      title: "Estado",
      dataIndex: "state",
      render: (state) => <Tag color={REQUEST_STATE_COLORS[state] ?? "default"}>{REQUEST_STATE_LABELS[state] ?? state}</Tag>,
    },
    {
      title: "Requisitos no cumplidos",
      dataIndex: "unmetRequirements",
      render: (unmet, { state }) =>
        unmet.length === 0 || state === "CANCELLED"
          ? "-"
          : unmet.map((name) => (
              <Tag key={name} color="red">
                {name}
              </Tag>
            )),
    },
    {
      title: "",
      key: "actions",
      align: "right",
      render: (_, request) => (
        <Button size="small" icon={<EyeOutlined />} onClick={() => onSelect(request.id)}>
          Ver detalle
        </Button>
      ),
    },
  ];

  return (
    <Card className="request request-admin__list" title="Solicitudes de los estudiantes">
      <div className="request-admin__filters">
        <div className="request-select__control">
          <label htmlFor="filter-convocation">Convocatoria</label>
          <Select
            id="filter-convocation"
            allowClear
            placeholder="Todas las convocatorias"
            value={filters.convocationId}
            onChange={(convocationId) => changeFilter("convocationId", convocationId)}
            options={convocations.map(({ id, title }) => ({ value: id, label: title }))}
          />
        </div>
        <div className="request-select__control">
          <label htmlFor="filter-state">Estado</label>
          <Select
            id="filter-state"
            allowClear
            placeholder="Todos los estados"
            value={filters.state}
            onChange={(state) => changeFilter("state", state)}
            options={STATE_OPTIONS}
          />
        </div>
      </div>
      {error && <Alert className="request-review__error" type="error" showIcon title={error} />}
      <Table
        rowKey="id"
        size="middle"
        rowClassName={({ state }) => (state === "PENDING" ? "request-admin__pending" : "")}
        loading={loading}
        columns={columns}
        dataSource={requests}
        pagination={{ pageSize: 10, hideOnSinglePage: true }}
        locale={{ emptyText: "No hay solicitudes con estos filtros" }}
        footer={() => `${requests.length} solicitud${requests.length === 1 ? "" : "es"}`}
      />
    </Card>
  );
};

ListRequests.propTypes = {
  onSelect: PropTypes.func.isRequired,
};

export default ListRequests;
