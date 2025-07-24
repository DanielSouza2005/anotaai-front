import { LoadingButton } from '@mui/lab';
import { Button, DialogActions } from '@mui/material';

const FormDialogActions = ({
    onClose,
    isSubmitting,
    submitText = 'Salvar',
    cancelText = 'Cancelar',
    submitColor = 'primary',
    disabled = false
}) => {
    return (
        <DialogActions>
            <Button
                onClick={onClose}
                disabled={isSubmitting || disabled}
            >
                {cancelText}
            </Button>
            <LoadingButton
                variant="contained"
                type="submit"
                color={submitColor}
                loading={isSubmitting}
                disabled={disabled}
            >
                {submitText}
            </LoadingButton>
        </DialogActions>
    );
};

export default FormDialogActions;