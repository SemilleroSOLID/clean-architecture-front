import { ROLES } from "./auth.constant";

// roles: who can open the page (#23); inMenu: false keeps it out of the header.
export const LINKS = {
  login: {
    url: "/login",
    label: "Iniciar sesión",
    inMenu: false,
  },
  example: {
    url: "/example",
    label: "Ejemplo",
    roles: [ROLES.admin, ROLES.student],
    inMenu: false,
  },
  convocation: {
    url: "/convocation",
    label: "Convocatorias",
    roles: [ROLES.admin, ROLES.student],
    description: "Consulte las convocatorias y sus requisitos.",
    adminDescription: "Cree, edite y cambie el estado de las convocatorias.",
  },
  request: {
    url: "/request",
    label: "Postularme",
    roles: [ROLES.student],
    description: "Envíe su solicitud a una convocatoria abierta.",
  },
  myRequests: {
    url: "/my-requests",
    label: "Mis solicitudes",
    roles: [ROLES.student],
    description: "Vea el estado de sus solicitudes o retire las que están en revisión.",
  },
  requestAdmin: {
    url: "/admin/requests",
    label: "Revisar solicitudes",
    roles: [ROLES.admin],
    description: "Revise las solicitudes de los estudiantes y apruébelas o rechácelas.",
  },
};

export const linksFor = (role) =>
  Object.values(LINKS).filter(({ inMenu = true, roles = [] }) => inMenu && roles.includes(role));

// After the login, go back to the page that was asked for only if the role can open it.
export const canOpen = (path, role) => {
  const link = Object.values(LINKS).find(({ url }) => url === path);
  return !link?.roles || link.roles.includes(role);
};
