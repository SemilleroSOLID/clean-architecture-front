import { DatabaseOutlined, PlusCircleOutlined, ExportOutlined } from '@ant-design/icons';
import CreateConvocation from '../components/convocation/children/createConvocation.component';
import ListConvocationTypes from '../components/convocation/children/listConvocationTypes.component';
import ListConvocations from '../components/convocation/children/listConvocations.component';
import { ROLES } from '../constants/auth.constant';

// roles: who sees the tab (#23); creating convocations is for the administrator.

export const CONVOCATION_TABS = [
    {
        label: "Consultar",
        icon: ExportOutlined,
        component: ListConvocations,
        withContainer: false,
        roles: [ROLES.admin, ROLES.student]
    },
    {
        label: "Crear",
        icon: PlusCircleOutlined,
        component: CreateConvocation,
        withContainer: false,
        roles: [ROLES.admin]
    },
    {
        label: "Tipos",
        icon: DatabaseOutlined,
        component: ListConvocationTypes,
        withContainer: true,
        roles: [ROLES.admin, ROLES.student]
    },
]