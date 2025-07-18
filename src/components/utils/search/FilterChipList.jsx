import { Chip } from "@mui/material";

const FilterChipList = ({ filters, fieldsAvailable, onDelete }) => {
    return (
        <>
            {filters.map((filter, index) => {
                const fieldLabel = fieldsAvailable.find(f => f.name === filter.field)?.label;

                return <Chip
                    key={index}
                    label={`${fieldLabel}: "${filter.value}"`}
                    onDelete={() => onDelete(index)}
                    color="primary"
                    variant="outlined"
                />
            })}
        </>
    )
}

export default FilterChipList;