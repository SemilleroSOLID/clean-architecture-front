export const ROLES = {
  admin: "ADMIN",
  student: "STUDENT",
};

export const ROLE_LABELS = {
  ADMIN: "Administrador",
  STUDENT: "Estudiante",
};

// Why the user is back in the login page (?reason=...).
export const SESSION_END_REASONS = {
  expired: "expired",
  logout: "logout",
};

export const SESSION_END_MESSAGES = {
  expired: { type: "warning", title: "Su sesión venció. Inicie sesión de nuevo." },
  logout: { type: "success", title: "Cerró sesión correctamente." },
};

// Seed users of create-database.sql, shown only while developing.
export const DEV_USERS = [
  { email: "admin@ucaldas.test", password: "Admin2026*", role: "ADMIN" },
  { email: "laura.gomez@ucaldas.test", password: "Estudiante2026*", role: "STUDENT" },
];
