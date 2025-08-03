import { Add as AddIcon } from '@mui/icons-material';
import { Box, IconButton, MenuItem, TextField, Tooltip } from "@mui/material";

const FilterInputRow = ({
    fieldsAvailable,
    newField,
    newValue,
    onFieldChange,
    onValueChange,
    onAddFilter,
    onKeyPress,
}) => {
    return (
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <TextField
                select
                label="Campo"
                value={newField}
                onChange={(e) => onFieldChange(e.target.value)}
                size="small"
                sx={{ minWidth: 150 }}
            >
                {fieldsAvailable.map((field) => (
                    <MenuItem key={field.name} value={field.name}>
                        {field.label}
                    </MenuItem>
                ))}
            </TextField>

            <TextField
                label="Valor"
                value={newValue}
                onChange={(e) => onValueChange(e.target.value)}
                onKeyPress={onKeyPress}
                size="small"
                sx={{ flexGrow: 1 }}
            />

            <Tooltip title="Adicionar filtro">
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
}

export default FilterInputRow;