import { useMemo, useState } from "react";
import { CONVOCATION_TABS } from "../../schema/convocationTabs.schema";
import Tabs from "../common/tabs";

const Convocation = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const { component: Content, withContainer } = useMemo(
    () => CONVOCATION_TABS[currentTab],
    [currentTab]
  );

  const wrapContent = useMemo(() => {
    return withContainer ? (
      <div className="convocation-content">
        <Content />
      </div>
    ) : (
      <Content />
    );
  }, [withContainer]);

  return (
    <div className="convocation">
      <div className="convocation-content">
        <Tabs
          title={"Convocatorias"}
          items={CONVOCATION_TABS}
          onChangeTab={setCurrentTab}
        />
      </div>

      {wrapContent}
    </div>
  );
};

export default Convocation;
