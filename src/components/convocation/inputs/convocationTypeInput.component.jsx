import { Select } from "antd";

const ConvocationTypeInput = ({ ...props }) => {
  return (
    <Select
      defaultValue={null}
      {...props}
      options={[
        { value: "jack", label: "Jack" },
        { value: "lucy", label: "Lucy" },
        { value: "Yiminghe", label: "yiminghe" },
        { value: "disabled", label: "Disabled", disabled: true },
      ]}
    />
  );
};

export default ConvocationTypeInput;
