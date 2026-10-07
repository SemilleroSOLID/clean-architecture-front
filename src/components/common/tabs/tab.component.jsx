import PropTypes from "prop-types";
import { useCallback } from "react";

const Tab = ({ icon, label, onClick, isActive, index }) => {
  const onClickTab = useCallback(() => {
    onClick(index);
  }, [index, onClick]);

  return (
    <div
      onClick={onClickTab}
      className={`tabs__tab ${isActive && "tabs__tab--active"}`}
    >
      <div className="tabs__tab--icon">{icon}</div>
      <div className="tabs__tab--label">{label}</div>
    </div>
  );
};
Tab.propTypes = {
  icon: PropTypes.node,
  label: PropTypes.string,
  onClick: PropTypes.func,
  isActive: PropTypes.bool,
  index: PropTypes.number,
};

export default Tab;
