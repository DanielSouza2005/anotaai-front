import { Fade, Menu, MenuItem, Typography } from "@mui/material";
import { GridDownloadIcon } from "@mui/x-data-grid";
import { getBackupRowMenuStyles } from "./styles/BackupRowMenuStyles";

const BackupRowMenu = ({ anchorEl, open, onClose, onDownload }) => {

    const styles = getBackupRowMenuStyles();

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
                <Typography variant="body2">Baixar Backup</Typography>
            </MenuItem>
        </Menu>
    );
}

export default BackupRowMenu;