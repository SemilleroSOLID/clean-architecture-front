import { DatePicker, Input } from 'antd';
import ConvocationTypeInput from '../components/convocation/inputs/convocationTypeInput.component';
import ConvocationRequirement from '../components/requirement/createRequirement.component';
import { endDateRule, isNotAfterToday, startDateRule } from '../utils/convocationValidation.util';
const { TextArea } = Input;

export const CREATE_CONVOCATION = [
  {
    label: "Titulo",
    name: "title",
    className: "create-convocation__title",
    rules: [{ whitespace: true, message: "El título no puede estar vacío" }],
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
    optional: true,
    component: TextArea,
    childrenProps: {
      placeholder: "Ingrese la descripción de la convocatoria (opcional)"
    },
  },
  {
    className: "create-convocation__requirements",
    name: "convocationRequirements",
    component: ConvocationRequirement,
    optional: true,
    rules: [{ required: true, type: "array", min: 1, message: "Agregue al menos un requisito" }],
  },
  {
    label: "Fecha de inicio",
    name: "startDate",
    className: "create-convocation__startDate",
    component: DatePicker,
    rules: [startDateRule],
    childrenProps: {
      format: 'YYYY-MM-DD',
      disabledDate: isNotAfterToday,
    },
  },
  {
    label: "Fecha de fin",
    name: "endDate",
    className: "create-convocation__endDate",
    component: DatePicker,
    rules: [endDateRule],
    dependencies: ["startDate"],
    childrenProps: {
      format: 'YYYY-MM-DD',
      disabledDate: isNotAfterToday,
    },
  }
]