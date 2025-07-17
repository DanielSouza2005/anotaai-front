import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import {
    Fade,
    Menu,
    MenuItem,
    Typography,
} from '@mui/material';

const EntityRowMenu = ({ anchorEl, open, onClose, onEdit, onDelete, onDetails }) => {
    return (
        <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={onClose}
            TransitionComponent={Fade}
            PaperProps={{
                sx: {
                    borderRadius: 2,
                    minWidth: 150,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                },
            }}
        >
            <MenuItem onClick={onEdit} sx={{ gap: 1, py: 1 }}>
                <EditIcon fontSize="small" sx={{ color: 'primary.main' }} />
                <Typography variant="body2">Editar</Typography>
            </MenuItem>

            <MenuItem onClick={onDelete} sx={{ gap: 1, py: 1 }}>
                <DeleteIcon fontSize="small" sx={{ color: 'error.main' }} />
                <Typography variant="body2">Excluir</Typography>
            </MenuItem>

            <MenuItem onClick={onDetails} sx={{ gap: 1, py: 1 }}>
                <InfoOutlinedIcon fontSize="small" sx={{ color: 'info.main' }} />
                <Typography variant="body2">Detalhes</Typography>
            </MenuItem>
        </Menu>
    );
};

export default EntityRowMenu;
