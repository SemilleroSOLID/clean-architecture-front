import PropTypes from "prop-types";
import Tab from "./tab.component";
import { useCallback, useMemo, useState } from "react";

const Tabs = ({ title, items }) => {
  const [active, setActive] = useState(0);
  const Content = useMemo(() => items[active].component, [active, items]);
  const onClickTab = useCallback((index) => setActive(index), []);

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
      <div className="tabs__content">
        <Content />
      </div>
    </div>
  );
};

Tabs.propTypes = {
  items: PropTypes.array,
  title: PropTypes.string,
};

export default Tabs;
