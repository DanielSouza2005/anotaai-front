import { Box, Typography } from "@mui/material";
import dayjs from "dayjs";

const STATUS_LABELS = {
    PENDENTE: "Pendente",
    PROCESSANDO: "Processando",
    CONCLUIDO: "Concluído",
    ERRO: "Erro",
};

const STATUS_COLORS = {
    PENDENTE: { bg: "#FFF8E1", border: "#FFE082", text: "#F9A825" },
    PROCESSANDO: { bg: "#E3F2FD", border: "#90CAF9", text: "#1565C0" },
    CONCLUIDO: { bg: "#E8F5E9", border: "#A5D6A7", text: "#2E7D32" },
    ERRO: { bg: "#FFEBEE", border: "#EF9A9A", text: "#C62828" },
};

const TIPO_EXPORTACAO_LABELS = {
    CONTATO: "Contatos",
    EMPRESA: "Empresas",
};

const TIPO_EXPORTACAO_COLORS = {
    CONTATO: { bg: "#E3F2FD", border: "#90CAF9", text: "#1976D2" },
    EMPRESA: { bg: "#EDE7F6", border: "#B39DDB", text: "#5E35B1" },
};

export const ExportacaoColumns = [
    {
        field: "tipo_exportacao",
        headerName: "Tipo",
        flex: 1,
        renderCell: (params) => {
            const value = params.value;
            const colors =
                TIPO_EXPORTACAO_COLORS[value] || {
                    bg: "#E0E0E0",
                    border: "#BDBDBD",
                    text: "#424242",
                };
            return (
                <Box
                    sx={{
                        bgcolor: colors.bg,
                        border: `1px solid ${colors.border}`,
                        borderRadius: "12px",
                        px: 2,
                        py: 0.5,
                        display: "inline-block",
                        textAlign: "center",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                        minWidth: 80,
                    }}
                >
                    <Typography
                        variant="body2"
                        color={colors.text}
                        fontWeight={600}
                        textAlign="center"
                    >
                        {TIPO_EXPORTACAO_LABELS[value] || value}
                    </Typography>
                </Box>
            );
        },
    },
    {
        field: "status",
        headerName: "Status",
        flex: 1,
        renderCell: (params) => {
            const value = params.value;
            const colors =
                STATUS_COLORS[value] || {
                    bg: "#E0E0E0",
                    border: "#BDBDBD",
                    text: "#424242",
                };
            return (
                <Box
                    sx={{
                        bgcolor: colors.bg,
                        border: `1px solid ${colors.border}`,
                        borderRadius: "12px",
                        px: 2,
                        py: 0.5,
                        display: "inline-block",
                        textAlign: "center",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                        minWidth: 80,
                    }}
                >
                    <Typography
                        variant="body2"
                        color={colors.text}
                        fontWeight={600}
                        textAlign="center"
                    >
                        {STATUS_LABELS[value] || value}
                    </Typography>
                </Box>
            );
        },
    },
    {
        field: 'dtInclusao',
        headerName: 'Dt. Início',
        flex: 1,
        valueFormatter: (params) => {
            const value = params;
            return value ? dayjs(value).format('DD/MM/YYYY HH:mm') : '';
        },
    },
    {
        field: 'dtTermino',
        headerName: 'Dt. Término',
        flex: 1,
        valueFormatter: (params) => {
            const value = params;
            return value ? dayjs(value).format('DD/MM/YYYY HH:mm') : '';
        },
    },
    {
        field: 'acoes'
    },
];