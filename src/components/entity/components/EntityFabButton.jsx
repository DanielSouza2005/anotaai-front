import { Add } from "@mui/icons-material";
import { Fab, Zoom } from "@mui/material";

const EntityFabButton = ({ color, onClick }) => {
    return (
        <Zoom in timeout={500}>
            <Fab
                color={color || "primary"}
                sx={{ position: 'fixed', bottom: 16, right: 16 }}
                onClick={onClick}
            >
                <Add />
            </Fab>
        </Zoom>
    );
}

export default EntityFabButton;