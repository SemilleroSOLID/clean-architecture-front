import { Button, Modal } from "antd";
import PropTypes from "prop-types";
import { DoubleRightOutlined } from "@ant-design/icons";
import CommonForm from "../common/inputs/form.component";
import { useCallback, useState } from "react";
import { CREATE_REQUIREMENT } from "../../schema/createRequirement.schema";

const ConvocationRequirement = ({ onChange, value = [] }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const showModal = useCallback(() => setIsOpenModal(true), []);
  const hiddeModal = useCallback(() => setIsOpenModal(false), []);

  return (
    <>
      <Modal
        className="requirement-create__modal"
        open={isOpenModal}
        onCancel={hiddeModal}
        closable
        destroyOnClose
        footer={<></>}
      >
        <CommonForm
          onFinish={(requirement) => {
            onChange([...value, requirement]);
            hiddeModal();
          }}
          className="requirement-create"
          submitLabel={"Agregar"}
          inputItems={CREATE_REQUIREMENT}
        />
      </Modal>
      <Button
        className="requirements "
        icon={<DoubleRightOutlined />}
        iconPosition="end"
        onClick={showModal}
      >
        Agregar requisito
      </Button>
    </>
  );
};

ConvocationRequirement.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.array,
};

export default ConvocationRequirement;
