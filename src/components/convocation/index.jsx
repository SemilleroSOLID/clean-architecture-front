import { useMemo, useState } from "react";
import { CONVOCATION_TABS } from "../../schema/convocationTabs.schema";
import Tabs from "../common/tabs";
import { useAuth } from "../../hooks/useAuth";

const Convocation = () => {
  const { session } = useAuth();
  const [currentTab, setCurrentTab] = useState(0);
  const tabs = useMemo(() => CONVOCATION_TABS.filter(({ roles }) => roles.includes(session.role)), [session.role]);

  const { component: Content, withContainer } = useMemo(
    () => tabs[currentTab],
    [tabs, currentTab]
  );

  const wrapContent = withContainer ? (
    <div className="convocation-content">
      <Content />
    </div>
  ) : (
    <Content />
  );

  return (
    <div className="convocation">
      <div className="convocation-content">
        <Tabs
          title={"Convocatorias"}
          items={tabs}
          onChangeTab={setCurrentTab}
        />
      </div>

      {wrapContent}
    </div>
  );
};

export default Convocation;
