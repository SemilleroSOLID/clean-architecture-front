import { DatePicker, Input } from 'antd';
import ConvocationTypeInput from '../components/convocation/inputs/convocationTypeInput.component';
import ConvocationRequirement from '../components/requirement/createRequirement.component';
const { TextArea } = Input;

export const CREATE_CONVOCATION = [
  {
    label: "Titulo",
    name: "title",
    component: Input,
    childrenProps: {
      placeholder: "Ingrese el nombre de la convocatoria"
    }
  },
  {
    label: "Tipo de convocatoria",
    name: "type",
    component: ConvocationTypeInput,
    childrenProps: {
      placeholder: "Seleccione el tipo de convocatoria"
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
  {
    name: "convocationRequirements",
    component: ConvocationRequirement
  },
  {
    label: "Fecha de inicio",
    name: "startDate",
    component: DatePicker,
    childrenProps: {
      format: 'YYYY-MM-DD'
    },
  },
  {
    label: "Fecha de fin",
    name: "endDate",
    component: DatePicker,
    childrenProps: {
      format: 'YYYY-MM-DD'
    },
  }
]