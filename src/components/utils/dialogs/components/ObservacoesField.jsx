import { TextField } from "@mui/material";
import { Field } from "formik";

const ObservacoesField = ({ value, readOnly, style, standalone = false }) => {
    if (standalone) {
        return (
            <TextField
                label="Observações"
                value={value}
                fullWidth
                multiline
                minRows={10}
                style={style}
                readOnly={readOnly}
                InputProps={{
                    sx: { backgroundColor: '#e3f2fd', borderRadius: 1 },
                }}
            />
        );
    }

    return (
        <Field name="obs">
            {({ field, meta }) => (
                <TextField
                    {...field}
                    value={value || field.value}
                    label="Observações"
                    fullWidth
                    multiline
                    minRows={10}
                    error={Boolean(meta.touched && meta.error)}
                    helperText={meta.touched && meta.error}
                    style={style}
                    readOnly={readOnly}
                    sx={{ flex: 1 }}
                />
            )}
        </Field>
    );
};

export default ObservacoesField;
