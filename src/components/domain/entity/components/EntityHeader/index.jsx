import { EventNote } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { getEntityHeaderStyles } from './styles/EntityHeaderStyles';

const EntityHeader = ({ title, icon: CustomIcon = EventNote }) => {
    const styles = getEntityHeaderStyles();

    return (
        <Box sx={styles.header.container}>
            <CustomIcon sx={styles.header.icon} />
            <Typography
                variant="h5"
                sx={styles.header.title}
                component="h1"
            >
                {title}
            </Typography>
        </Box>
    );
};

export default EntityHeader;