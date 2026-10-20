import { REQUEST_STATE_ORDER } from "../constants/request.constant";

const byCreationDate = (a, b) => a.creationDate.localeCompare(b.creationDate) || a.id - b.id;
const stateIndex = ({ state }) => REQUEST_STATE_ORDER.indexOf(state);

// Sort options of the history of a student (#18); dates are "YYYY-MM-DD" strings, so they sort as text.
export const STUDENT_REQUESTS_SORT_OPTIONS = [
  { value: "newest", label: "Fecha de postulación (más reciente primero)", compare: (a, b) => byCreationDate(b, a) },
  { value: "oldest", label: "Fecha de postulación (más antigua primero)", compare: byCreationDate },
  { value: "state", label: "Estado", compare: (a, b) => stateIndex(a) - stateIndex(b) || byCreationDate(b, a) },
];
