import { BugReportOutlined } from "@mui/icons-material";
import { Fade, Menu, MenuItem, Typography } from "@mui/material";
import { getImportacaoRowMenuStyles } from "./styles/ImportacaoRowMenuStyles";

const ImportacaoRowMenu = ({ anchorEl, open, onClose, onDetailError }) => {

    const styles = getImportacaoRowMenuStyles();

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
            <MenuItem onClick={onDetailError} sx={styles.menu.item}>
                <BugReportOutlined fontSize="small" sx={styles.menu.items.error} />
                <Typography variant="body2">Detalhar Erro</Typography>
            </MenuItem>
        </Menu>
    );
}

export default ImportacaoRowMenu;