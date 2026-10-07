import PropTypes from "prop-types";
import Tab from "./tab.component";
import { useCallback, useMemo, useState } from "react";

const Tabs = ({ title, items, onChangeTab, showContent = false }) => {
  const [active, setActive] = useState(0);
  const Content = useMemo(() => items[active].component, [active, items]);

  const onClickTab = useCallback(
    (index) => {
      onChangeTab(index);
      setActive(index);
    },
    [onChangeTab]
  );

  return (
    <div className="tabs">
      <div className="tabs__header">
        <div className="tabs__title">{title}</div>
        {items &&
          items.map(({ icon: IconComponent, label }, index) => (
            <Tab
              key={index + label}
              index={index}
              label={label}
              onClick={onClickTab}
              isActive={index == active}
              icon={<IconComponent />}
            />
          ))}
      </div>
      {showContent && (
        <div className="tabs__content">
          <Content />
        </div>
      )}
    </div>
  );
};

Tabs.propTypes = {
  items: PropTypes.array,
  showContent: PropTypes.bool,
  onChangeTab: PropTypes.func,
  title: PropTypes.string,
};

export default Tabs;
