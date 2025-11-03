import {
    Close,
    FileDownloadOutlined
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
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    Typography
} from "@mui/material";
import { useState } from "react";

const ENTIDADES = [
    { label: "Contatos", value: "CONTATO" },
    { label: "Empresas", value: "EMPRESA" },
];

const ImportacaoDialog = ({ open, onClose, onImport }) => {
    const [entidade, setEntidade] = useState("");
    const [arquivo, setArquivo] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleConfirm = async () => {
        if (!entidade || !arquivo) {
            setError("Selecione a entidade e o arquivo para importar.");
            return;
        }

        setError("");
        setLoading(true);

        try {
            await onImport({ entidade, arquivo });
            handleCancel();
        } catch (err) {
            setError("Erro ao processar a importação.");
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setEntidade("");
        setArquivo(null);
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
                    <FileDownloadOutlined />
                    <Typography>Importar Dados</Typography>
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
                    <InputLabel id="entidade-label">Entidade</InputLabel>
                    <Select
                        labelId="entidade-label"
                        id="entidade-select"
                        value={entidade}
                        onChange={(e) => setEntidade(e.target.value)}
                        label="Entidade"
                    >
                        {ENTIDADES.map((opt) => (
                            <MenuItem key={opt.value} value={opt.value}>
                                {opt.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Box>
                    <Button
                        variant="outlined"
                        component="label"
                        fullWidth
                        startIcon={<FileDownloadOutlined />}
                        sx={{ mb: 1 }}
                    >
                        Selecionar Arquivo
                        <input
                            type="file"
                            hidden
                            name="arquivo"
                            accept=".xlsx"
                            onChange={(e) => setArquivo(e.currentTarget.files[0])}
                        />
                    </Button>
                    {arquivo && (
                        <Typography
                            variant="body2"
                            sx={{
                                mt: 0.5,
                                px: 1,
                                py: 0.5,
                                borderRadius: 1,
                                bgcolor: "background.paper",
                                fontFamily: "monospace",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {arquivo.name}
                        </Typography>
                    )}
                </Box>
            </DialogContent>

            <DialogActions sx={{ pt: 0 }}>
                <Button onClick={handleCancel}>Cancelar</Button>
                <Button
                    onClick={handleConfirm}
                    variant="contained"
                    disabled={!entidade || !arquivo || loading}
                    startIcon={loading ? <CircularProgress size={18} color="inherit" /> : null}
                >
                    {loading ? "Importando..." : "Importar"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ImportacaoDialog;
