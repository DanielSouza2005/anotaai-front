import { Add } from "@mui/icons-material";
import { Fab, Zoom } from "@mui/material";
import { getEntityFabButtonStyles } from "./styles/EntityFabButtonStyles";

const EntityFabButton = ({ color = 'primary', onClick }) => {
    const styles = getEntityFabButtonStyles();

    return (
        <Zoom in timeout={styles.fabButton.animations.fabTimeout}>
            <Fab
                color={color}
                sx={styles.fabButton}
                onClick={onClick}
                aria-label="Adicionar novo item"
            >
                <Add />
            </Fab>
        </Zoom>
    );
};

export default EntityFabButton;