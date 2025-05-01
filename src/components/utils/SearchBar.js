import { Box, MenuItem, TextField } from "@mui/material";

const SearchBar = ({ value, fieldsAvailable, fieldSelected, onFieldChange, onChange }) => {
    return (
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
                select
                label="Campo"
                value={fieldSelected}
                onChange={onFieldChange}
                size="small"
                sx={{ minWidth: 200 }}
            >
                {fieldsAvailable.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>

            <TextField
                label="Pesquisar"
                value={value}
                onChange={onChange}
                size="small"
                fullWidth
            />
        </Box>
    );
}

export default SearchBar;