import {
    Business as BusinessIcon,
    EventNote as EventNoteIcon,
    Group as GroupIcon,
    List as ListIcon
} from '@mui/icons-material';

export const menuItems = [
    {
        title: "Contatos",
        icon: EventNoteIcon,
        basePath: "/dashboard/contatos",
        subItems: [
            { label: "Listar Contatos", path: "/dashboard/contatos", icon: ListIcon },
        ]
    },
    {
        title: "Empresas",
        icon: BusinessIcon,
        basePath: "/dashboard/empresas",
        subItems: [
            { label: "Listar Empresas", path: "/dashboard/empresas", icon: ListIcon },
        ]
    },
    {
        title: "Usuários",
        icon: GroupIcon,
        basePath: "/dashboard/usuarios",
        subItems: [
            { label: "Listar Usuários", path: "/dashboard/usuarios", icon: ListIcon },
        ]
    }
];
