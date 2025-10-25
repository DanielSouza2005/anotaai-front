import { Box, Typography } from "@mui/material";
import dayjs from "dayjs";

const TIPO_OPERACAO_LABELS = {
    0: 'Backup',
    1: 'Limpeza'
};

const TIPO_OPERACAO_COLORS = {
    0: { bg: '#E3F2FD', border: '#90CAF9', text: '#1976D2' }, 
    1: { bg: '#BBDEFB', border: '#1976D2', text: '#0D47A1' }  
};

const RESULTADO_LABELS = {
    0: 'Erro',
    1: 'Sucesso'
};

const RESULTADO_COLORS = {
    0: { bg: '#FFEBEE', border: '#EF9A9A', text: '#B71C1C' },
    1: { bg: '#E8F5E9', border: '#A5D6A7', text: '#2E7D32' } 
};

export const BackupLogColums = [
    { field: 'mensagem', headerName: 'Mensagem', flex: 3 },
    {
        field: 'tipoOperacao',
        headerName: 'Tipo',
        flex: 0.75,
        renderCell: (params) => {
            const value = params.value;
            const colors = TIPO_OPERACAO_COLORS[value] || { bg: '#E0E0E0', border: '#BDBDBD', text: '#424242' };
            return (
                <Box
                    sx={{
                        bgcolor: colors.bg,
                        border: `1px solid ${colors.border}`,
                        borderRadius: '12px',
                        px: 2,
                        py: 0.5,
                        display: 'inline-block',
                        textAlign: 'center',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                        minWidth: 60
                    }}
                >
                    <Typography variant="body2" color={colors.text} fontWeight={600} textAlign="center">
                        {TIPO_OPERACAO_LABELS[value] || 'Desconhecido'}
                    </Typography>
                </Box>
            );
        }
    },
    {
        field: 'sucesso',
        headerName: 'Resultado',
        flex: 0.75,
        renderCell: (params) => {
            const value = params.value;
            const colors = RESULTADO_COLORS[value] || { bg: '#E0E0E0', border: '#BDBDBD', text: '#424242' };
            return (
                <Box
                    sx={{
                        bgcolor: colors.bg,
                        border: `1px solid ${colors.border}`,
                        borderRadius: '12px',
                        px: 2,
                        py: 0.5,
                        display: 'inline-block',
                        textAlign: 'center',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                        minWidth: 60
                    }}
                >
                    <Typography variant="body2" color={colors.text} fontWeight={600} textAlign="center">
                        {RESULTADO_LABELS[value] || 'Desconhecido'}
                    </Typography>
                </Box>
            );
        }
    },
    {
        field: 'dtInicio',
        headerName: 'Dt. Execução',
        flex: 0.75,        
        valueFormatter: (params) => {
            const value = params;
            return value ? dayjs(value).format('DD/MM/YYYY HH:mm') : '';
        },
    },
];
