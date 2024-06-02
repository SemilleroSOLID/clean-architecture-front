import { Select } from "antd";
import { useEffect, useState } from "react";
import { getConditionRequirement } from "../../../services/convocation.service";

const RequirementConditionInput = ({ ...props }) => {
  const [conditionRequirements, setConditionRequirements] = useState([]);

  const getConditionRequirements = () => {
    getConditionRequirement()
      .then((data) => {
        if(data != undefined)
        setConditionRequirements(data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getConditionRequirements();
  }, []);

  return (
    <Select
      defaultValue={null}
      {...props}
      options={conditionRequirements.map(({ id, convocationTypeName }) => ({
        value: id,
        label: convocationTypeName,
      }))}
    />
  );
};

export default RequirementConditionInput;
