import {
    Business as BusinessIcon,
    EventNote as EventNoteIcon,
    Group as GroupIcon
} from '@mui/icons-material';

export const menuItems = [
    {
        title: "Contatos",
        icon: EventNoteIcon,
        basePath: "/dashboard/contatos",
    },
    {
        title: "Empresas",
        icon: BusinessIcon,
        basePath: "/dashboard/empresas",
    },
    {
        title: "Usuários",
        icon: GroupIcon,
        basePath: "/dashboard/usuarios",
    }
];
