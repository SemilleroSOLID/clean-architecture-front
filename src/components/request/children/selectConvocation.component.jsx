import PropTypes from "prop-types";
import { Empty, Select } from "antd";
import { CONVOCATION_TYPE_LABELS } from "../../../constants/convocation.constant";
import ConvocationSummary from "./convocationSummary.component";

// Step 1: the open convocation the student of the session applies to.
const SelectConvocation = ({ convocations, convocation, onConvocationChange }) => (
  <div className="request-select">
    <div className="request-select__controls">
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
  convocations: PropTypes.array.isRequired,
  convocation: PropTypes.object,
  onConvocationChange: PropTypes.func.isRequired,
};

export default SelectConvocation;
