import { Select } from "antd";
import { useEffect, useState } from "react";
import { getConvocationTypes } from "../../../services/convocation.service";

const ConvocationTypeInput = ({ ...props }) => {
  const [convocationTypes, setConvocationTypes] = useState([]);

  const getConvocationsTypes = () => {
    getConvocationTypes()
      .then((data) => {
        setConvocationTypes(data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getConvocationsTypes();
  }, []);

  return (
    <Select
      defaultValue={null}
      {...props}
      options={convocationTypes.map(({ id, convocationTypeName }) => ({
        value: id,
        label: convocationTypeName,
      }))}
    />
  );
};

export default ConvocationTypeInput;
