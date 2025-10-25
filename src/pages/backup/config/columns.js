import dayjs from "dayjs";

export const BackupColums = [
    { field: 'caminho_arquivo', headerName: 'Backup', flex: 4 },
    {
        field: 'dt_inclusao',
        headerName: 'Dt. Backup',
        valueFormatter: (params) => {
            const value = params;
            return value ? dayjs(value).format('DD/MM/YYYY HH:mm') : '';
        },
        flex: 1
    },
];