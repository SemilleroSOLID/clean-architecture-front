import { DatabaseOutlined, PlusCircleOutlined, ExportOutlined } from '@ant-design/icons';
import CreateConvocation from '../components/convocation/children/createConvocation.component';
import ListConvocationTypes from '../components/convocation/children/listConvocationTypes.component';
import ListConvocations from '../components/convocation/children/listConvocations.component';

export const CONVOCATION_TABS = [
    {
        label: "Consultar",
        icon: ExportOutlined,
        component: ListConvocations,
        withContainer: true
    },
    {
        label: "Crear",
        icon: PlusCircleOutlined,
        component: CreateConvocation,
        withContainer: false
    },
    {
        label: "Tipos",
        icon: DatabaseOutlined,
        component: ListConvocationTypes,
        withContainer: true
    },
]