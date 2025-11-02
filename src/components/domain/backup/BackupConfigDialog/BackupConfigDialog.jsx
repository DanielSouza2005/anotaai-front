import {
    Dialog,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select,
    Switch
} from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useFormik } from "formik";
import FormDialogActions from "../../dialogs/components/FormDialogActions/FormDialogActions";

const FREQUENCIAS = [
    { label: "Diário", value: "DIARIO" },
    { label: "Semanal", value: "SEMANAL" },
    { label: "Mensal", value: "MENSAL" }
];

const BackupConfigDialog = ({ open, onClose, initialValues, onSubmit }) => {

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues || {
            frequencia: "DIARIO",
            dtProximoBackup: dayjs(),
            ativo: true
        },
        onSubmit: async (values) => {
            await onSubmit(values, onClose);
        }
    });

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Configurar Backup</DialogTitle>

            <form onSubmit={formik.handleSubmit}>
                <DialogContent
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 3,
                        mt: 1,
                        pb: 3
                    }}
                >
                    <FormControl fullWidth variant="outlined" margin="dense">
                        <InputLabel shrink>Frequência</InputLabel>
                        <Select
                            name="frequencia"
                            value={formik.values.frequencia}
                            onChange={formik.handleChange}
                            label="Frequência"
                        >
                            {FREQUENCIAS.map((f) => (
                                <MenuItem key={f.value} value={f.value}>
                                    {f.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                        <DateTimePicker
                            label="Dt. Próximo Backup"
                            value={formik.values.dtProximoBackup}
                            onChange={(value) =>
                                formik.setFieldValue("dtProximoBackup", value)
                            }
                            ampm={false}
                            slotProps={{
                                textField: {
                                    fullWidth: true,
                                    variant: "outlined",
                                    margin: "dense"
                                }
                            }}
                        />
                    </LocalizationProvider>

                    <FormControlLabel
                        control={
                            <Switch
                                checked={!!formik.values.ativo}
                                onChange={(e) =>
                                    formik.setFieldValue("ativo", e.target.checked)
                                }
                            />
                        }
                        label="Ativo"
                    />
                </DialogContent>

                <FormDialogActions
                    onClose={onClose}
                    isSubmitting={formik.isSubmitting}
                />
            </form>
        </Dialog>

    );
};

export default BackupConfigDialog;
