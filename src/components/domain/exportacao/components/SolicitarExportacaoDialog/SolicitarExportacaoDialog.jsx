import {
    Close,
    FileUploadOutlined
} from "@mui/icons-material";
import {
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Fade,
    FormControl,
    FormControlLabel,
    IconButton,
    InputLabel,
    MenuItem,
    Paper,
    Radio,
    RadioGroup,
    Select,
    Typography
} from "@mui/material";
import { useState } from "react";

const tipoExportacaoOptions = [
    { label: "Contatos", value: 0 },
    { label: "Empresas", value: 1 },
];

const exportacaoCompletaOptions = [
    { label: "Exportação Completa", value: 0 },
    { label: "Somente Cabeçalho", value: 1 },
];

const SolicitarExportacaoDialog = ({ open, onClose, onConfirm }) => {
    const [dado, setDado] = useState("");
    const [tipoExportacao, setTipoExportacao] = useState("0");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleConfirm = async () => {
        if (dado === "") {
            setError("Selecione um dado para exportar.");
            return;
        }

        setError("");
        setLoading(true);

        try {
            await onConfirm(dado, tipoExportacao);
            onClose();
        } catch (err) {
            console.error(err);
            setError("Erro ao realizar exportação");
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setDado("");
        setTipoExportacao("0");
        setError("");
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleCancel}
            TransitionComponent={Fade}
            maxWidth="xs"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 3,
                    p: 2,
                    boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                },
            }}
        >
            <DialogTitle
                sx={{
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    pb: 1,
                }}
            >
                <Box display="flex" alignItems="center" gap={1}>
                    <FileUploadOutlined />
                    <Typography>Exportar Dados</Typography>
                </Box>
                <IconButton onClick={handleCancel} size="small">
                    <Close />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{ pt: 1 }}>
                {error && (
                    <Typography color="error" variant="body2" sx={{ mt: 2 }}>
                        {error}
                    </Typography>
                )}

                <FormControl fullWidth sx={{ mt: 2, mb: 2 }}>

                    <InputLabel id="Dado-label">Dado</InputLabel>
                    <Select
                        labelId="Dado-label"
                        id="Dado-select"
                        value={dado}
                        onChange={(e) => setDado(e.target.value)}
                        label="Dado"
                    >
                        {tipoExportacaoOptions.map((opt) => (
                            <MenuItem key={opt.value} value={opt.value}>
                                {opt.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl component="fieldset" fullWidth>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        Tipo de Exportação
                    </Typography>

                    <Paper
                        variant="outlined"
                        sx={{
                            borderRadius: 2,
                            borderColor: "divider",
                            p: 1.5,
                            backgroundColor: "background.default",
                        }}
                    >
                        <RadioGroup
                            value={tipoExportacao}
                            onChange={(e) => setTipoExportacao(e.target.value)}
                        >
                            {exportacaoCompletaOptions.map((opt) => (
                                <FormControlLabel
                                    key={opt.value}
                                    value={String(opt.value)}
                                    control={<Radio />}
                                    label={opt.label}
                                />
                            ))}
                        </RadioGroup>
                    </Paper>
                </FormControl>

            </DialogContent>

            <DialogActions sx={{ pt: 0 }}>
                <Button onClick={handleCancel}>Cancelar</Button>
                <Button
                    onClick={handleConfirm}
                    variant="contained"
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={18} color="inherit" /> : null}
                >
                    {loading ? "Enviando..." : "Exportar"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default SolicitarExportacaoDialog;
