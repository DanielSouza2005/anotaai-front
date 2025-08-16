import { Box } from '@mui/material';
import { useState } from 'react';
import FilterInputRow from './components/FilterInputRow';
import FilterPanel from './components/FilterPanel';

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
            <FilterInputRow
                fieldsAvailable={fieldsAvailable}
                newField={newField}
                newValue={newValue}
                onFieldChange={setNewField}
                onValueChange={setNewValue}
                onAddFilter={handleAddFilter}
                onKeyPress={handleKeyPress}
            />

            {hasFilters && (
                <FilterPanel
                    filters={filters}
                    onDeleteFilter={handleDeleteFilter}
                    onClearAll={handleClearAllFilters}
                    fieldsAvailable={fieldsAvailable}
                />
            )}
        </Box>
    );
};

export default AdvancedSearchBar;
