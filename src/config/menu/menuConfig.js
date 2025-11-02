import {
    Business as BusinessIcon,
    EventNote as EventNoteIcon,
    Group as GroupIcon
} from '@mui/icons-material';
import BackupIcon from '@mui/icons-material/Backup';
import FileUploadOutlined from '@mui/icons-material/FileUploadOutlined';
import FileDownloadOutlined from '@mui/icons-material/FileDownloadOutlined';

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
    }
];

export const menuItemsAdmin = [
    {
        title: "Usuários",
        icon: GroupIcon,
        basePath: "/dashboard/usuarios",
    },
    {
        title: "Backups",
        icon: BackupIcon,
        basePath: "/dashboard/backup",
    },
    {
        title: "Exportação",
        icon: FileUploadOutlined,
        basePath: "/dashboard/exportacao",
    },
    {
        title: "Importação",
        icon: FileDownloadOutlined,
        basePath: "/dashboard/importacao",
    }
];

