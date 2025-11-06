import { Switch } from "@mui/material";
import dayjs from "dayjs";

export const gridUsuarioFields = [
    { field: 'nome', headerName: 'Nome', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    {
        field: 'dt_inclusao',
        headerName: 'Dt. Inclusão',
        valueFormatter: (params) => {
            const value = params;
            return value ? dayjs(value).format('DD/MM/YYYY HH:mm') : '';
        },
        flex: 1
    },
    {
        field: 'dt_alteracao',
        headerName: 'Dt. Últ. Alteração',
        valueFormatter: (params) => {
            const value = params;
            return value ? dayjs(value).format('DD/MM/YYYY HH:mm') : '';
        },
        flex: 1
    },
    {
        field: 'admin',
        headerName: 'Administrador',
        renderCell: (params) => (
            <Switch
                checked={!!params.value}
                color="primary"
            />
        )
    },
    {
        field: 'acoes'
    }
];