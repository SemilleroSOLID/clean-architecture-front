import { DatePicker, Input } from 'antd';
import ConvocationTypeInput from '../components/convocation/inputs/convocationTypeInput.component';
import ConvocationRequirement from '../components/requirement/createRequirement.component';
const { TextArea } = Input;

export const CREATE_CONVOCATION = [
  {
    label: "Titulo",
    name: "title",
    className: "create-convocation__title",
    component: Input,
    childrenProps: {
      placeholder: "Ingrese el nombre de la convocatoria"
    }
  },
  {
    label: "Tipo de convocatoria",
    name: "type",
    className: "create-convocation__type",
    component: ConvocationTypeInput,
    childrenProps: {
      placeholder: "Seleccione el tipo de convocatoria"
    }
  },
  {
    label: "Descripcion",
    name: "description",
    className: "create-convocation__description",
    component: TextArea,
    childrenProps: {
      placeholder: "Ingrese la descripcion de la convocatoria"
    },
  },
  {
    className: "create-convocation__requirements",
    name: "convocationRequirements",
    component: ConvocationRequirement
  },
  {
    label: "Fecha de inicio",
    name: "startDate",
    className: "create-convocation__startDate",
    component: DatePicker,
    childrenProps: {
      format: 'YYYY-MM-DD'
    },
  },
  {
    label: "Fecha de fin",
    name: "endDate",
    className: "create-convocation__endDate",
    component: DatePicker,
    childrenProps: {
      format: 'YYYY-MM-DD'
    },
  }
]