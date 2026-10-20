import PropTypes from "prop-types";
import { Alert, Empty, Select } from "antd";
import { CONVOCATION_TYPE_LABELS } from "../../../constants/convocation.constant";
import ConvocationSummary from "./convocationSummary.component";

// Step 1: who applies (temporary until the login of #23) and to which open convocation.
const SelectConvocation = ({ students, convocations, studentId, convocation, onStudentChange, onConvocationChange }) => (
  <div className="request-select">
    <Alert
      type="info"
      showIcon
      title="Mientras no exista el inicio de sesión (#23), elija el estudiante que se postula."
    />
    <div className="request-select__controls">
      <div className="request-select__control">
        <label htmlFor="request-student">Estudiante</label>
        <Select
          id="request-student"
          placeholder="Seleccione el estudiante"
          value={studentId}
          onChange={onStudentChange}
          options={students.map(({ id, name, program }) => ({ value: id, label: `${name} · ${program}` }))}
        />
      </div>
      <div className="request-select__control">
        <label htmlFor="request-convocation">Convocatoria</label>
        <Select
          id="request-convocation"
          placeholder="Seleccione una convocatoria abierta"
          value={convocation?.id}
          onChange={onConvocationChange}
          notFoundContent={<Empty description="No hay convocatorias recibiendo solicitudes" />}
          options={convocations.map(({ id, title, type }) => ({
            value: id,
            label: `${title} · ${CONVOCATION_TYPE_LABELS[type] ?? type}`,
          }))}
        />
      </div>
    </div>
    {convocation && <ConvocationSummary convocation={convocation} />}
  </div>
);

SelectConvocation.propTypes = {
  students: PropTypes.array.isRequired,
  convocations: PropTypes.array.isRequired,
  studentId: PropTypes.number,
  convocation: PropTypes.object,
  onStudentChange: PropTypes.func.isRequired,
  onConvocationChange: PropTypes.func.isRequired,
};

export default SelectConvocation;
