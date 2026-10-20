import { Input } from "antd";
import { attachmentField, describeCondition, valueField } from "../utils/request.util";

const ATTACHMENT_MAX_LENGTH = 500;

// One value field per requirement of the convocation, and an optional attachment link.
export const buildRequestFormItems = (requirements) =>
  requirements.flatMap((requirement) => [
    {
      label: `${requirement.name} (${describeCondition(requirement)})`,
      name: valueField(requirement.id),
      className: "request-form__value",
      rules: [{ whitespace: true, message: "Ingrese el valor de este requisito" }],
      component: Input,
      childrenProps: {
        id: valueField(requirement.id),
        placeholder: requirement.description || "Ingrese su valor para este requisito",
      },
    },
    {
      label: "Adjunto (enlace al documento, opcional)",
      name: attachmentField(requirement.id),
      className: "request-form__attachment",
      optional: true,
      rules: [{ max: ATTACHMENT_MAX_LENGTH, message: `El adjunto no puede tener más de ${ATTACHMENT_MAX_LENGTH} caracteres` }],
      component: Input,
      childrenProps: {
        id: attachmentField(requirement.id),
        placeholder: "https://...",
      },
    },
  ]);
