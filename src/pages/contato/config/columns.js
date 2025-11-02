import { Email } from "@mui/icons-material";
import { Chip, Stack } from "@mui/material";

export const gridContatoColumns = [
    { field: 'nome', headerName: 'Nome', flex: 1 },
    {
        field: 'emails',
        headerName: 'E-mail',
        flex: 1.75,
        sortable: false,
        renderCell: (params) => {
            let emails = params.row.emails || [];

            if (typeof emails === 'string') {
                emails = emails.split(",").map((e) => e.trim());
            }

            const visibleEmails = emails.slice(0, 2);
            const hiddenCount = emails.length - visibleEmails.length;

            return (
                <Stack
                    direction="row"
                    spacing={0.5}
                    flexWrap="wrap"
                    sx={{
                        width: "100%",
                        height: "100%",
                        alignItems: "center",
                        justifyContent: "flex-start",
                    }}
                >
                    {visibleEmails.map((email, index) => (
                        <Chip
                            key={index}
                            icon={<Email />}
                            label={`${email}`}
                            size="small"
                            sx={{
                                backgroundColor: 'rgba(25, 118, 210, 0.2)',
                                color: '#0D47A1',
                                fontWeight: 500,
                            }}
                        />
                    ))}
                    {hiddenCount > 0 && (
                        <Chip
                            label={`+${hiddenCount}`}
                            size="small"
                            sx={{
                                backgroundColor: 'rgba(25, 118, 210, 0.1)',
                                color: '#0D47A1',
                                fontWeight: 500,
                            }}
                        />
                    )}
                </Stack>
            );
        },
    },
    {
        field: 'empresa_razao',
        headerName: 'Empresa (Razão)',
        flex: 1,
        renderCell: (params) => params.row?.empresa?.razao || '',
    },
    {
        field: 'empresa_fantasia',
        headerName: 'Empresa (Fantasia)',
        flex: 1,
        renderCell: (params) => params.row?.empresa?.fantasia || '',
    },
    {
        field: 'acoes'
    }
];