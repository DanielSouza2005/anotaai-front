import { Box } from '@mui/material';

const TabPanel = ({ children, value, index }) => {
    if (value !== index) return null;
    return <Box sx={{ width: '100%' }}>{children}</Box>;
};

export default TabPanel;
