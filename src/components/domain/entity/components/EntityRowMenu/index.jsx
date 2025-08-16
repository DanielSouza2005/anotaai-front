import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import {
    Fade,
    Menu,
    MenuItem,
    Typography,
} from '@mui/material';
import { getEntityRowMenuStyles } from './styles/EntityRowMenuStyles';

const EntityRowMenu = ({ anchorEl, open, onClose, onEdit, onDelete, onDetails }) => {

    const styles = getEntityRowMenuStyles();

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
            <MenuItem onClick={onEdit} sx={styles.menu.item}>
                <EditIcon fontSize="small" sx={styles.menu.items.edit} />
                <Typography variant="body2">Editar</Typography>
            </MenuItem>

            <MenuItem onClick={onDelete} sx={styles.menu.item}>
                <DeleteIcon fontSize="small" sx={styles.menu.items.delete} />
                <Typography variant="body2">Excluir</Typography>
            </MenuItem>

            <MenuItem onClick={onDetails} sx={styles.menu.item}>
                <InfoOutlinedIcon fontSize="small" sx={styles.menu.items.details} />
                <Typography variant="body2">Detalhes</Typography>
            </MenuItem>
        </Menu>
    );
};

export default EntityRowMenu;
