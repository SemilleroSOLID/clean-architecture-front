import {
    FileTextOutlined, TagOutlined,
    CalendarOutlined,
    ClockCircleOutlined,
    ExclamationCircleOutlined
} from '@ant-design/icons';
import { CONVOCATION_STATE_LABELS, CONVOCATION_TYPE_LABELS } from '../constants/convocation.constant';
import { formatDate } from '../utils/date.util';

const typeLabel = ({ type }) => CONVOCATION_TYPE_LABELS[type] ?? type;
const stateLabel = ({ state }) => CONVOCATION_STATE_LABELS[state] ?? state;

// Fields shown in each card of the convocation list.
export const LIST_CONVOCATIONS_FIELDS = [
    { key: "description", icon: FileTextOutlined, render: ({ description }) => description || "Sin descripción" },
    { key: "type", icon: TagOutlined, render: typeLabel },
    { key: "startDate", icon: CalendarOutlined, render: ({ startDate }) => `Inicio: ${formatDate(startDate)}` },
    { key: "endDate", icon: ClockCircleOutlined, render: ({ endDate }) => `Fin: ${formatDate(endDate)}` },
    { key: "state", icon: ExclamationCircleOutlined, render: stateLabel },
];

const STATE_ORDER = ["OPEN", "CLOSED", "FINISHED", "CANCELLED"];
const byStartDate = (a, b) => a.startDate.localeCompare(b.startDate);
const thenByStartDate = (compare) => (a, b) => compare(a, b) || byStartDate(a, b);

// Sort options of the list; dates are "YYYY-MM-DD" strings, so they sort as text.
export const LIST_CONVOCATIONS_SORT_OPTIONS = [
    { value: "startDateAsc", label: "Fecha de inicio (más próxima primero)", compare: byStartDate },
    { value: "startDateDesc", label: "Fecha de inicio (más lejana primero)", compare: (a, b) => byStartDate(b, a) },
    { value: "type", label: "Tipo de convocatoria", compare: thenByStartDate((a, b) => typeLabel(a).localeCompare(typeLabel(b))) },
    { value: "state", label: "Estado", compare: thenByStartDate((a, b) => STATE_ORDER.indexOf(a.state) - STATE_ORDER.indexOf(b.state)) },
];

export const ALL_OPTION = "ALL";

export const TYPE_FILTER_OPTIONS = [
    { value: ALL_OPTION, label: "Todos los tipos" },
    ...Object.entries(CONVOCATION_TYPE_LABELS).map(([value, label]) => ({ value, label })),
];

export const STATE_FILTER_OPTIONS = [
    { value: ALL_OPTION, label: "Todos los estados" },
    ...Object.entries(CONVOCATION_STATE_LABELS).map(([value, label]) => ({ value, label })),
];
