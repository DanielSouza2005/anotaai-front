import { FileDownloadOutlined } from "@mui/icons-material";
import { Fab, Zoom } from "@mui/material";
import { getImportacaoFabButtonStyles } from "./styles/ImportacaoFabButtonStyles";

const ImportacaoFabButton = ({ color = 'primary', onClick }) => {
    const styles = getImportacaoFabButtonStyles();

    return (
        <Zoom in timeout={styles.fabButton.animations.fabTimeout}>
            <Fab
                color={color}
                sx={styles.fabButton.root}
                onClick={onClick}
                aria-label="Importar Dados"
            >
                <FileDownloadOutlined />
            </Fab>
        </Zoom>
    );
};

export default ImportacaoFabButton;
