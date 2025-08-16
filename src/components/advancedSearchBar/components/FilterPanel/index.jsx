import { Close as CloseIcon, FilterList } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import FilterChipList from "../FilterChipList";
import { FILTER_PANEL_TEXTS, getFilterPanelStyles } from "./styles/FilterPanelStyles";

const FilterPanel = ({ filters, onDeleteFilter, onClearAll, fieldsAvailable }) => {
    const styles = getFilterPanelStyles();

    return (
        <Box sx={styles.container}>
            <Box sx={styles.header}>
                <FilterList color="primary" />
                <Typography variant="subtitle1" sx={styles.title}>
                    {FILTER_PANEL_TEXTS.title}
                </Typography>
            </Box>

            <IconButton size="small" onClick={onClearAll} sx={styles.clearButton}>
                <CloseIcon fontSize="small" />
            </IconButton>

            <Box sx={styles.chipList}>
                <FilterChipList
                    filters={filters}
                    fieldsAvailable={fieldsAvailable}
                    onDelete={onDeleteFilter}
                />
            </Box>
        </Box>
    );
};

export default FilterPanel;