import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Button } from "@mui/material";
import { getEntityToolbarStyles } from "./styles/EntityToolbarStyles";

const EntityToolbar = ({ showFilters, onToggleFilters }) => {

    const styles = getEntityToolbarStyles();

    return (
        <Button
            variant="text"
            startIcon={showFilters ? <ExpandLess /> : <ExpandMore />}
            onClick={onToggleFilters}
            sx={{
                ...styles.toolbar.button,
                mb: showFilters ? 1 : 0,
            }}
        >
            {showFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}
        </Button>
    )
}

export default EntityToolbar;