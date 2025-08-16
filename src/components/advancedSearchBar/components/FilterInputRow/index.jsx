import { Add as AddIcon } from '@mui/icons-material';
import { Box, IconButton, MenuItem, TextField, Tooltip } from "@mui/material";
import { FILTER_INPUT_ROW_TEXTS, getFilterInputRowStyles } from "./styles/FilterInputRowStyles";

const FilterInputRow = ({
    fieldsAvailable,
    newField,
    newValue,
    onFieldChange,
    onValueChange,
    onAddFilter,
    onKeyPress,
}) => {
    const styles = getFilterInputRowStyles();

    return (
        <Box sx={styles.container}>
            <TextField
                select
                label={FILTER_INPUT_ROW_TEXTS.fieldLabel}
                value={newField}
                onChange={(e) => onFieldChange(e.target.value)}
                size="small"
                sx={styles.fieldSelect}
            >
                {fieldsAvailable.map((field) => (
                    <MenuItem key={field.name} value={field.name}>
                        {field.label}
                    </MenuItem>
                ))}
            </TextField>

            <TextField
                label={FILTER_INPUT_ROW_TEXTS.valueLabel}
                value={newValue}
                onChange={(e) => onValueChange(e.target.value)}
                onKeyPress={onKeyPress}
                size="small"
                sx={styles.valueInput}
            />

            <Tooltip title={FILTER_INPUT_ROW_TEXTS.addFilterTooltip}>
                <span>
                    <IconButton
                        color="primary"
                        onClick={onAddFilter}
                        disabled={!newValue}
                    >
                        <AddIcon />
                    </IconButton>
                </span>
            </Tooltip>
        </Box>
    );
};

export default FilterInputRow;
