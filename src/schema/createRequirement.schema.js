import { Input } from 'antd';
import RequirementConditionInput from '../components/requirement/inputs/requirementConditionInput.component';
import RequirementTypeInput from '../components/requirement/inputs/requirementTypeInput.component';
import { requiredValueRule } from '../utils/convocationValidation.util';
const { TextArea } = Input;

export const CREATE_REQUIREMENT = [
  {
    label: "Nombre del requerimiento",
    name: "name",
    className: "create-requirement__name",
    component: Input,
    childrenProps: {
      placeholder: "Ingrese el nombre del requerimiento"
    }
  },
  {
    label: "Valor requerido",
    name: "requiredValue",
    className: "create-requirement__value",
    rules: [requiredValueRule],
    dependencies: ["requirementId"],
    component: Input,
    childrenProps: {
      placeholder: "Ingrese el valor requerido"
    }
  },
  {
    label: "Tipo de condicion",
    name: "conditional",
    className: "create-requirement__condition",
    component: RequirementConditionInput,
    childrenProps: {
      placeholder: "Seleccione la condicion"
    }
  },
  {
    label: "Tipo de requerimiento",
    name: "requirementId",
    className: "create-requirement__type",
    component: RequirementTypeInput,
    childrenProps: {
      placeholder: "Tipo de requisito"
    }
  },
  {
    label: "Descripcion",
    name: "description",
    className: "create-requirement__description",
    optional: true,
    component: TextArea,
    childrenProps: {
      placeholder: "Ingrese una descripción del requisito (opcional)"
    },
  },
]