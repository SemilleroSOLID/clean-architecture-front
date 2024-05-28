import { useMemo } from "react";
import { CREATORS } from "../../../constants/creators.constant";

const Footer = () => {
  const creatorsKeys = useMemo(() => Object.keys(CREATORS), []);
  return (
    <footer className="layout-footer">
      <div className="layout-footer__company">
        <div className="layout-footer__logo">
          <img src="./src/assets/logo-uc-orange.png" alt="logo" />
        </div>
        <div className="layout-footer__title">
          Sistema de Gestión de Servicios
        </div>
        <p className="layout-footer__description">
          Los estudiantes pueden crear solicitudes a las convocatorias y ver el
          progreso de las mismas, al igual que los administradores que las
          crean.
        </p>
      </div>

      <div className="layout-footer__credits">
        Creado en un semillero de principios SOLID por
        <div className="layout-footer__credits--links">
          {creatorsKeys.map((key, index) => {
            const { name, github } = CREATORS[key];
            return (
              <a key={index} className="main-content__author" href={github}>
                {name}
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
