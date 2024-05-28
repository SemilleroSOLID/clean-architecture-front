import { DatabaseOutlined, PlusCircleOutlined, ExportOutlined } from '@ant-design/icons';
import CreateConvocation from '../components/convocation/children/createConvocation.component';
import ListConvocationTypes from '../components/convocation/children/listConvocationTypes.component';

export const CONVOCATION_TABS = [
    {
        label: "Consultar",
        icon: ExportOutlined,
        component: CreateConvocation

    },
    {
        label: "Crear",
        icon: PlusCircleOutlined,
        component: CreateConvocation

    },
    {
        label: "Tipos",
        icon: DatabaseOutlined,
        component: ListConvocationTypes
    },

]