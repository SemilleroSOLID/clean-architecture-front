import { CONVOCATION_TABS } from "../../schema/convocationTabs.schema";
import { Tabs } from "antd";

const Convocation = () => {
  return (
    <div className="convocation-content">
      <Tabs
        defaultActiveKey="1"
        centered
        items={CONVOCATION_TABS.map(
          (
            { children: Component, icon: IconComponent, ...convocationTab },
            index
          ) => ({
            ...convocationTab,
            key: index,
            icon: <IconComponent />,
            children: <Component />,
          })
        )}
      />
    </div>
  );
};

export default Convocation;
