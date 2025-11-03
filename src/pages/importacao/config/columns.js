import { Box, Typography } from "@mui/material";
import dayjs from "dayjs";

const STATUS_LABELS = {
    PROCESSANDO: "Processando",
    SUCESSO: "Concluído",
    PARCIAL: "Parcial",
    ERRO: "Erro",
};

const STATUS_COLORS = {
    PROCESSANDO: { bg: "#E3F2FD", border: "#90CAF9", text: "#1565C0" },
    SUCESSO: { bg: "#E8F5E9", border: "#A5D6A7", text: "#2E7D32" },
    PARCIAL: { bg: "#FFF3E0", border: "#FFCC80", text: "#EF6C00" },
    ERRO: { bg: "#FFEBEE", border: "#EF9A9A", text: "#C62828" },
};

const TIPO_IMPORTACAO_LABELS = {
    CONTATO: "Contatos",
    EMPRESA: "Empresas",
};

const TIPO_IMPORTACAO_COLORS = {
    CONTATO: { bg: "#E3F2FD", border: "#90CAF9", text: "#1976D2" },
    EMPRESA: { bg: "#EDE7F6", border: "#B39DDB", text: "#5E35B1" },
};

export const ImportacaoColumns = [
    {
        field: "tipoImportacao",
        headerName: "Tipo",
        flex: 1,
        renderCell: (params) => {
            const value = params.value;
            const colors =
                TIPO_IMPORTACAO_COLORS[value] || {
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
                        {TIPO_IMPORTACAO_LABELS[value] || value}
                    </Typography>
                </Box>
            );
        },
    },
    {
        field: "statusImportacao",
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
                        minWidth: 100,
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
        field: "dtInicio",
        headerName: "Dt. Início",
        flex: 1,
        valueFormatter: (params) => {
            const value = params;
            return value ? dayjs(value).format("DD/MM/YYYY HH:mm") : "";
        },
    },
    {
        field: "dtFim",
        headerName: "Dt. Término",
        flex: 1,
        valueFormatter: (params) => {
            const value = params;
            return value ? dayjs(value).format("DD/MM/YYYY HH:mm") : "";
        },
    },
    {
        field: "totalRegistros",
        headerName: "Total Registros",
        flex: 0.8,
        align: "right",
        headerAlign: "right",
    },
    {
        field: "registrosSucesso",
        headerName: "Sucesso",
        flex: 0.8,
        align: "right",
        headerAlign: "right",
    },
    {
        field: "registrosErro",
        headerName: "Erros",
        flex: 0.8,
        align: "right",
        headerAlign: "right",
    },
    {
        field: "acoes", 
    },
];
