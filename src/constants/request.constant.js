export const REQUEST_STEPS = [
  { title: "Convocatoria" },
  { title: "Requisitos" },
  { title: "Revisión" },
  { title: "Resultado" },
];

// Same values as EnumStateRequest in the api.
export const REQUEST_STATE_LABELS = {
  PENDING: "Pendiente de aprobación",
  ACTIVE: "Activa",
  REJECT: "Rechazada",
  ACCEPT: "Aprobada",
};

export const REQUEST_STATE_COLORS = {
  PENDING: "orange",
  ACTIVE: "green",
  REJECT: "red",
  ACCEPT: "blue",
};

// States that still wait for the decision of the administrator (EnumStateRequest.UNDECIDED in the api).
export const UNDECIDED_REQUEST_STATES = ["PENDING", "ACTIVE"];

export const REJECTION_COMMENT_MAX_LENGTH = 500;
