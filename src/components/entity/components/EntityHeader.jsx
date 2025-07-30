import { EventNote } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

const EntityHeader = ({ title }) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <EventNote sx={{ color: 'blue', marginRight: 1 }} />
            <Typography variant="h5" fontWeight="bold">
                {title}
            </Typography>
        </Box>
    );
}

export default EntityHeader;