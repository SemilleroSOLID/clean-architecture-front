import PropTypes from "prop-types";
import { Button, Result, Tag } from "antd";
import { REQUEST_STATE_LABELS } from "../../../constants/request.constant";
import { describeCondition } from "../../../utils/request.util";

// Step 4: result of the automatic verification (#14). A pending request is never rejected automatically.
const RequestResult = ({ result, onNewRequest }) => {
  const { request, message } = result;
  const isPending = request.unmetRequirements.length > 0;

  return (
    <Result
      status={isPending ? "warning" : "success"}
      title={message}
      subTitle={
        <>
          Estado de la solicitud: <Tag color={isPending ? "orange" : "green"}>{REQUEST_STATE_LABELS[request.state] ?? request.state}</Tag>
        </>
      }
      extra={
        <Button type="primary" onClick={onNewRequest}>
          Hacer otra solicitud
        </Button>
      }
    >
      {isPending && (
        <div className="request-result__unmet">
          <div className="request__subtitle">Requisitos que no cumples</div>
          <ul>
            {request.unmetRequirements.map((requirement) => (
              <li key={requirement.convocationRequirementId}>
                <b>{requirement.name}:</b> se exige {describeCondition(requirement)} y ingresaste {requirement.value}
              </li>
            ))}
          </ul>
          <div>Un administrador revisará tu solicitud y decidirá si la aprueba.</div>
        </div>
      )}
    </Result>
  );
};

RequestResult.propTypes = {
  result: PropTypes.shape({
    request: PropTypes.object.isRequired,
    message: PropTypes.string.isRequired,
  }).isRequired,
  onNewRequest: PropTypes.func.isRequired,
};

export default RequestResult;
