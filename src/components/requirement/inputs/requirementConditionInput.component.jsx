import { Select } from "antd";
import { useEffect, useState } from "react";
import { getConditionRequirement } from "../../../services/requirement.service";

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
      options={conditionRequirements.map(({ id, conditionRequirementName }) => ({
        value: id,
        label: conditionRequirementName,
      }))}
    />
  );
};

export default RequirementConditionInput;
