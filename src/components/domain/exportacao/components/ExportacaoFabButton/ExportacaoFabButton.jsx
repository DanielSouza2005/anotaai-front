import { FileUploadOutlined } from "@mui/icons-material";
import { Fab, Zoom } from "@mui/material";
import { getExportacaoFabButtonStyles } from "./styles/ExportacaoFabButtonStyles";

const ExportacaoFabButton = ({ color = 'primary', onClick }) => {
    const styles = getExportacaoFabButtonStyles();

    return (
        <Zoom in timeout={styles.fabButton.animations.fabTimeout}>
            <Fab
                color={color}
                sx={styles.fabButton.root}
                onClick={onClick}
                aria-label="Exportar Dados"
            >
                <FileUploadOutlined />
            </Fab>
        </Zoom>
    );
};

export default ExportacaoFabButton;
