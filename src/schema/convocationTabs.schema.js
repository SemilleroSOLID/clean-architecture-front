import { DatabaseOutlined, PlusCircleOutlined, ExportOutlined } from '@ant-design/icons';
import { Empty } from 'antd'
import CreateConvocation from '../components/convocation/children/createConvocation.component';
import ListConvocationTypes from '../components/convocation/children/listConvocationTypes.component';

export const CONVOCATION_TABS = [
    {
        label: "Consultar",
        icon: ExportOutlined,
        component: Empty,
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