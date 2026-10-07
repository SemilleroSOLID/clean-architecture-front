import { Modal } from "antd";
import PropTypes from "prop-types";
import CommonForm from "../common/inputs/form.component";
import { CREATE_REQUIREMENT } from "../../schema/createRequirement.schema";

const RequirementModal = ({ open, initialValues, onSubmit, onCancel }) => {
  return (
    <Modal
      className="requirement-create__modal"
      open={open}
      onCancel={onCancel}
      closable
      destroyOnHidden
      footer={<></>}
    >
      <CommonForm
        initialValues={initialValues}
        onFinish={onSubmit}
        className="requirement-create"
        submitLabel={initialValues ? "Guardar cambios" : "Agregar"}
        inputItems={CREATE_REQUIREMENT}
      />
    </Modal>
  );
};

RequirementModal.propTypes = {
  open: PropTypes.bool,
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
};

export default RequirementModal;
