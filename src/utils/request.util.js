import dayjs from "dayjs";
import { CONDITION_LABELS } from "../constants/convocation.constant";

const DATE_FORMAT = "YYYY-MM-DD";

export const valueField = (requirementId) => `value_${requirementId}`;
export const attachmentField = (requirementId) => `attachment_${requirementId}`;

// Same rule as the api (OpenState): open and today between its start and end dates.
export const isReceivingRequests = ({ state, startDate, endDate }, today = dayjs().format(DATE_FORMAT)) =>
  state === "OPEN" && startDate <= today && today <= endDate;

// "Mayor o igual a 4.0"
export const describeCondition = ({ conditional, requiredValue }) =>
  `${CONDITION_LABELS[conditional] ?? conditional} ${requiredValue}`;

// The student is not sent: the api takes it from the token (#22).
export const toRequestPayload = (convocationId, requirements, values) => ({
  convocationId,
  requirements: requirements.map(({ id }) => ({
    convocationRequirementId: id,
    value: values[valueField(id)]?.trim(),
    attachment: values[attachmentField(id)]?.trim() || null,
  })),
});

// The api reports missing or invalid values as "requirements[<convocationRequirementId>]".
export const toRequirementFieldErrors = (fieldErrors = {}) =>
  Object.entries(fieldErrors)
    .map(([field, message]) => [field.match(/^requirements\[(\d+)\]$/)?.[1], message])
    .filter(([requirementId]) => requirementId)
    .map(([requirementId, message]) => ({ name: valueField(requirementId), errors: [message] }));
