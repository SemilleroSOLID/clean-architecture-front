import { CONVOCATION_TABS } from "../../schema/convocationTabs.schema";
import Tabs from "../common/tabs";

const Convocation = () => {
  return (
    <div className="convocation-content">
      <Tabs title={"Convocatorias"} items={CONVOCATION_TABS} />
    </div>
  );
};

export default Convocation;
