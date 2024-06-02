import { InputNumber, Input } from 'antd';
const { TextArea } = Input;

export const CREATE_REQUIREMENT = [
  {
    label: "Nombre del requerimiento",
    name: "name",
    component: Input,
    childrenProps: {
      placeholder: "Ingrese el nombre del requerimiento"
    }
  },
  {
    label: "Valor requerido",
    name: "requiredValue",
    component: Input,
    childrenProps: {
      placeholder: "Ingrese el nvalor requerido"
    }
  },
  {
    label: "Tipo de condicion",
    name: "conditional",
    component: InputNumber,
    childrenProps: {
      placeholder: "Ingrese la condicion"
    }
  },
  {
    label: "Descripcion",
    name: "description",
    component: TextArea,
    childrenProps: {
      placeholder: "Ingrese la descripcion de la convocatoria"
    },
  },
]