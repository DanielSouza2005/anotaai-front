import { Collapse } from "@mui/material";
import AdvancedSearchBar from "../../../advancedSearchBar/AdvancedSearchBar";

const EntityFilters = ({ showFilters, fieldsAvailable, onFilterChange }) => {
    return (
        <Collapse in={showFilters}>
            <AdvancedSearchBar
                fieldsAvailable={fieldsAvailable}
                onFilterChange={onFilterChange}
            />
        </Collapse>
    );
}

export default EntityFilters;