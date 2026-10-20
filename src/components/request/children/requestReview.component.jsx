import PropTypes from "prop-types";
import { Alert, Descriptions } from "antd";
import { attachmentField, describeCondition, valueField } from "../../../utils/request.util";

// Step 3: what the student is about to send, so it can be corrected before confirming.
const RequestReview = ({ student, convocation, values, error }) => {
  const items = [
    { key: "student", label: "Estudiante", span: 2, children: `${student.name} · ${student.program}` },
    { key: "convocation", label: "Convocatoria", span: 2, children: convocation.title },
    ...convocation.convocationRequirements.flatMap((requirement) => [
      {
        key: `value-${requirement.id}`,
        label: `${requirement.name} (se exige ${describeCondition(requirement)})`,
        children: values[valueField(requirement.id)],
      },
      {
        key: `attachment-${requirement.id}`,
        label: "Adjunto",
        children: values[attachmentField(requirement.id)] || "Sin adjunto",
      },
    ]),
  ];

  return (
    <div className="request-review">
      {error && <Alert className="request-review__error" type="error" showIcon title="No se pudo enviar la solicitud" description={error} />}
      <Descriptions bordered size="small" column={2} items={items} />
    </div>
  );
};

RequestReview.propTypes = {
  student: PropTypes.object.isRequired,
  convocation: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
  error: PropTypes.string,
};

export default RequestReview;
