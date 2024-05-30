import { DatePicker, Input } from 'antd';
import ConvocationTypeInput from '../components/convocation/inputs/convocationTypeInput.component';
const { TextArea } = Input;

export const CREATE_CONVOCATION = [
    {
        label: "Crear convocatoria",
        name: "createConvocation",
        component: Input,
        childrenProps: {
            placeholder: "Ingrese el nombre de la convocatoria"
        }
    },
    {
        label: "Tipo de convocatoria",
        name: "convocationType",
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
        label: "Fecha de inicio",
        name: "startDate",
        component: DatePicker
    },
    {
        label: "Fecha de fin",
        name: "finishDate",
        component: DatePicker
    }
]