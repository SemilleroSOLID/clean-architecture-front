import { DatabaseOutlined, PlusCircleOutlined, ExportOutlined } from '@ant-design/icons';
import CreateConvocation from '../components/convocation/children/createConvocation.component';
import ListConvocationTypes from '../components/convocation/children/listConvocationTypes.component';

export const CONVOCATION_TABS = [
    {
        label: "Consultar",
        icon: ExportOutlined,
        children: CreateConvocation

    },
    {
        label: "Crear",
        icon: PlusCircleOutlined,
        children: CreateConvocation

    },
    {
        label: "Tipos",
        icon: DatabaseOutlined,
        children: ListConvocationTypes

    },

]