import { Close as CloseIcon, FilterList } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import FilterChipList from "./FilterChipList";

const FilterPanel = ({ filters, onDeleteFilter, onClearAll, fieldsAvailable }) => {
    return (
        <Box
            sx={{
                border: '1px solid #ccc',
                borderRadius: 2,
                padding: 1.5,
                position: 'relative',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <FilterList color="primary" />
                <Typography variant="subtitle1" fontWeight="bold">
                    Filtros Avançados
                </Typography>
            </Box>

            <IconButton
                size="small"
                onClick={onClearAll}
                sx={{
                    position: 'absolute',
                    top: 4,
                    right: 4,
                }}
            >
                <CloseIcon fontSize="small" />
            </IconButton>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                <FilterChipList
                    filters={filters}
                    fieldsAvailable={fieldsAvailable}
                    onDelete={onDeleteFilter}
                />
            </Box>
        </Box>
    );
}

export default FilterPanel;