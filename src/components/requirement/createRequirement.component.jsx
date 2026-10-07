import { Button } from "antd";
import PropTypes from "prop-types";
import { DoubleRightOutlined } from "@ant-design/icons";

// Form field for the requirement list: the list itself is edited by the convocation form through RequirementModal.
const ConvocationRequirement = ({ onAdd }) => {
  return (
    <Button
      className="create-convocation__requirements"
      icon={<DoubleRightOutlined />}
      iconPlacement="end"
      onClick={onAdd}
    >
      Agregar requisito
    </Button>
  );
};

ConvocationRequirement.propTypes = {
  onAdd: PropTypes.func,
};

export default ConvocationRequirement;
