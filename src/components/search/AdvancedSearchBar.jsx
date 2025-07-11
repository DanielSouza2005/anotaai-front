import { Add as AddIcon, Close as CloseIcon, FilterList } from '@mui/icons-material';
import { Box, Chip, IconButton, MenuItem, TextField, Tooltip, Typography } from '@mui/material';
import { useState } from 'react';

const AdvancedSearchBar = ({ fieldsAvailable, onFilterChange }) => {
    const [filters, setFilters] = useState([]);
    const [newField, setNewField] = useState(fieldsAvailable?.[0]?.name || '');
    const [newValue, setNewValue] = useState('');

    const hasFilters = filters.length > 0;

    const applyFilters = (updatedFilters) => {
        setFilters(updatedFilters);
        onFilterChange(updatedFilters);
    };

    const handleAddFilter = () => {
        if (!newValue) return;
        const newFilter = { field: newField, value: newValue };
        const updatedFilters = [...filters, newFilter];
        applyFilters(updatedFilters);
        setNewValue('');
    };

    const handleDeleteFilter = (index) => {
        const updatedFilters = filters.filter((_, idx) => idx !== index);
        applyFilters(updatedFilters);
    };

    const handleClearAllFilters = () => {
        applyFilters([]);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddFilter();
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <TextField
                    select
                    label="Campo"
                    value={newField}
                    onChange={(e) => setNewField(e.target.value)}
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
                    onChange={(e) => setNewValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    size="small"
                    sx={{ flexGrow: 1 }}
                />
                <Tooltip title="Adicionar filtro">
                    <span>
                        <IconButton
                            color="primary"
                            onClick={handleAddFilter}
                            disabled={!newValue}
                        >
                            <AddIcon />
                        </IconButton>
                    </span>
                </Tooltip>
            </Box>

            {hasFilters && (
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
                        onClick={handleClearAllFilters}
                        sx={{
                            position: 'absolute',
                            top: 4,
                            right: 4,
                        }}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {filters.map((filter, index) => (
                            <Chip
                                key={index}
                                label={`${fieldsAvailable.find(f => f.name === filter.field)?.label}: "${filter.value}"`}
                                onDelete={() => handleDeleteFilter(index)}
                                color="primary"
                                variant="outlined"
                            />
                        ))}
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default AdvancedSearchBar;
