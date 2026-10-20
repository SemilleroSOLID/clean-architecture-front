import { NavLink } from "react-router-dom";
import { Button, Tag } from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { linksFor } from "../../../constants/links.constant";
import { ROLE_LABELS } from "../../../constants/auth.constant";
import { useAuth } from "../../../hooks/useAuth";
import logoBlue from "../../../assets/logo-uc-blue.png";

// The menu depends on the role of the session (#23); without a session only the logo is shown.
const Header = () => {
  const { session, signOut } = useAuth();
  return (
    <header className="layout-header">
      <NavLink className="layout-header__logo" to="/">
        <img src={logoBlue} alt="logo" />
      </NavLink>
      {session && (
        <>
          <nav className="layout-header__options">
            {linksFor(session.role).map(({ url, label }) => (
              <div className="layout-header__options--item" key={url}>
                <NavLink className="layout-header__options--text" to={url}>
                  {label}
                </NavLink>
              </div>
            ))}
          </nav>
          <div className="layout-header__user">
            <UserOutlined />
            <span className="layout-header__user-name">{session.name}</span>
            <Tag color={session.role === "ADMIN" ? "blue" : "gold"}>{ROLE_LABELS[session.role]}</Tag>
            <Button size="small" icon={<LogoutOutlined />} onClick={() => signOut()}>
              Cerrar sesión
            </Button>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
