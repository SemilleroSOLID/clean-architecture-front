import { useMemo } from "react";
import { LINKS } from "../../../constants/links.constant";

const Header = () => {
  const linkKeys = useMemo(() => Object.keys(LINKS), []);
  return (
    <header className="layout-header">
      <div className="layout-header__logo">
        <img src="./src/assets/logo-uc-blue.png" alt="logo" />
      </div>
      <div className="layout-header__options">
        {linkKeys.map((key, index) => {
          const { url, label } = LINKS[key];
          return (
            <div className="layout-header__options--item" key={index}>
              <a className="layout-header__options--text" href={url}>
                {label}
              </a>
            </div>
          );
        })}
      </div>
    </header>
  );
};

export default Header;
