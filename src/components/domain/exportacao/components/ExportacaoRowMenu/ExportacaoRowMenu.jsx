import { BugReportOutlined } from "@mui/icons-material";
import { Fade, Menu, MenuItem, Typography } from "@mui/material";
import { GridDownloadIcon } from "@mui/x-data-grid";
import { getExportacaoRowMenuStyles } from "./styles/ExportacaoRowMenuStyles";

const ExportacaoRowMenu = ({ anchorEl, open, onClose, onDownload, onDetailError }) => {

    const styles = getExportacaoRowMenuStyles();

    return (
        <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={onClose}
            TransitionComponent={Fade}
            PaperProps={{
                sx: styles.menu.paper,
            }}
        >
            <MenuItem onClick={onDownload} sx={styles.menu.item}>
                <GridDownloadIcon fontSize="small" sx={styles.menu.items.download} />
                <Typography variant="body2">Baixar Arquivo</Typography>
            </MenuItem>
            <MenuItem onClick={onDetailError} sx={styles.menu.item}>
                <BugReportOutlined fontSize="small" sx={styles.menu.items.error} />
                <Typography variant="body2">Detalhar Erro</Typography>
            </MenuItem>
        </Menu>
    );
}

export default ExportacaoRowMenu;