import { useEffect, useMemo, useState } from "react";
import { Alert, Button, Card, Popconfirm, Select, Space, Table, Tag, message } from "antd";
import { ArrowLeftOutlined, PlusOutlined, RollbackOutlined } from "@ant-design/icons";
import { cancelRequest, getMyRequests } from "../../services/request.service";
import { REQUEST_STATE_COLORS, REQUEST_STATE_LABELS, UNDECIDED_REQUEST_STATES } from "../../constants/request.constant";
import { CONVOCATION_TYPE_LABELS } from "../../constants/convocation.constant";
import { LINKS } from "../../constants/links.constant";
import { STUDENT_REQUESTS_SORT_OPTIONS } from "../../schema/studentRequests.schema";
import { formatDate } from "../../utils/date.util";

const BASE_COLUMNS = [
  { title: "Convocatoria", dataIndex: "convocationTitle" },
  { title: "Tipo", dataIndex: "convocationType", render: (type) => CONVOCATION_TYPE_LABELS[type] ?? type },
  { title: "Inicio", dataIndex: "convocationStartDate", render: formatDate },
  { title: "Fin", dataIndex: "convocationEndDate", render: formatDate },
  { title: "Me postulé el", dataIndex: "creationDate", render: formatDate },
  {
    title: "Estado",
    dataIndex: "state",
    render: (state) => <Tag color={REQUEST_STATE_COLORS[state] ?? "default"}>{REQUEST_STATE_LABELS[state] ?? state}</Tag>,
  },
  {
    title: "Observación",
    key: "comment",
    render: (_, { state, comment }) =>
      state === "REJECT" && comment ? (
        <div className="student-requests__comment">
          <b>Motivo del rechazo:</b> {comment}
        </div>
      ) : (
        "-"
      ),
  },
];

// Student: history of every convocation applied to, with the state of each request (#18); the student is the one of the session (#23).
const StudentRequests = () => {
  const [requests, setRequests] = useState([]);
  const [sortBy, setSortBy] = useState(STUDENT_REQUESTS_SORT_OPTIONS[0].value);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [withdrawingId, setWithdrawingId] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    let ignore = false;
    getMyRequests()
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
  }, []);

  // The student withdraws a request still in review (#19); the api checks it again.
  const withdraw = async (requestId) => {
    setWithdrawingId(requestId);
    try {
      const updated = await cancelRequest(requestId);
      setRequests((current) => current.map((request) => (request.id === updated.id ? updated : request)));
      messageApi.success("Retiraste tu solicitud: ya no se considera para la selección");
    } catch (withdrawError) {
      messageApi.error(withdrawError.message);
    } finally {
      setWithdrawingId(null);
    }
  };

  const columns = [
    ...BASE_COLUMNS,
    {
      title: "",
      key: "actions",
      align: "right",
      render: (_, { id, state, convocationTitle }) =>
        UNDECIDED_REQUEST_STATES.includes(state) && (
          <Popconfirm
            title="¿Retirar tu solicitud?"
            description={`Ya no se considerará para "${convocationTitle}" y no podrás deshacerlo.`}
            okText="Retirar"
            okButtonProps={{ danger: true }}
            cancelText="Cancelar"
            onConfirm={() => withdraw(id)}
          >
            <Button size="small" danger icon={<RollbackOutlined />} loading={withdrawingId === id}>
              Retirar
            </Button>
          </Popconfirm>
        ),
    },
  ];

  const sortedRequests = useMemo(() => {
    const { compare } = STUDENT_REQUESTS_SORT_OPTIONS.find(({ value }) => value === sortBy);
    return requests.toSorted(compare);
  }, [requests, sortBy]);

  return (
    <Card
      className="request student-requests"
      title="Mis solicitudes"
      extra={
        <Space>
          <Button icon={<ArrowLeftOutlined />} href={LINKS.convocation.url}>
            Ver convocatorias
          </Button>
          <Button type="primary" icon={<PlusOutlined />} href={LINKS.request.url}>
            Postularme
          </Button>
        </Space>
      }
    >
      <div className="request-admin__filters student-requests__toolbar">
        <div className="request-select__control">
          <label htmlFor="history-sort">Ordenar por</label>
          <Select
            id="history-sort"
            value={sortBy}
            onChange={setSortBy}
            options={STUDENT_REQUESTS_SORT_OPTIONS.map(({ value, label }) => ({ value, label }))}
          />
        </div>
      </div>
      {contextHolder}
      {error && <Alert className="request-review__error" type="error" showIcon title={error} />}
      <Table
        rowKey="id"
        size="middle"
        loading={loading}
        columns={columns}
        dataSource={sortedRequests}
        pagination={{ pageSize: 10, hideOnSinglePage: true }}
        locale={{ emptyText: "Todavía no te has postulado a ninguna convocatoria" }}
      />
    </Card>
  );
};

export default StudentRequests;
