import { Select } from "antd";
import { useEffect, useState } from "react";
import { getTypeRequirement } from "../../../services/requirement.service";

const RequirementTypeInput = ({ ...props }) => {
  const [requirementTypes, setRequirementTypes] = useState([]);

  const getRequirementTypes = () => {
    getTypeRequirement()
      .then((data) => {
        if (data != undefined) setRequirementTypes(data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getRequirementTypes();
  }, []);

  return (
    <Select
      defaultValue={null}
      {...props}
      options={requirementTypes.map(({ id, convocationTypeName }) => ({
        value: id,
        label: convocationTypeName,
      }))}
    />
  );
};

export default RequirementTypeInput;
