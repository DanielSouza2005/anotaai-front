import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Button } from "@mui/material";

const EntityToolbar = ({ showFilters, onToggleFilters }) => {
    return (
        <Button
            variant="text"
            startIcon={showFilters ? <ExpandLess /> : <ExpandMore />}
            onClick={onToggleFilters}
            sx={{
                mb: showFilters ? 1 : 0,
                minHeight: '32px',
                paddingY: '4px',
            }}
        >
            {showFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}
        </Button>
    )
}

export default EntityToolbar;