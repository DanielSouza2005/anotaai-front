import {
    Search as SearchIcon
} from '@mui/icons-material';
import { InputAdornment, TextField } from "@mui/material";

const SearchBar = ({ value, onChange }) => {
    return (
        <TextField
            placeholder="Pesquisar..."
            variant="outlined"
            size="small"
            fullWidth
            value={value}
            onChange={onChange}
            sx={{ mb: 2, maxWidth: 400 }}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
            }}
        />
    );
}

export default SearchBar;