import { Settings } from "@mui/icons-material";
import { Fab, Zoom } from "@mui/material";
import { getBackupFabButtonStyles } from "./styles/getBackupFabButtonStyles";

const BackupFabButton = ({ color = 'primary', onClick }) => {
    const styles = getBackupFabButtonStyles();

    return (
        <Zoom in timeout={styles.fabButton.animations.fabTimeout}>
            <Fab
                color={color}
                sx={styles.fabButton}
                onClick={onClick}
                aria-label="Configurar Backup"
            >
                <Settings />
            </Fab>
        </Zoom>
    );
};

export default BackupFabButton;