import { Box, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import TabPanel from './TabPanel';

const TabbedFormLayout = ({ tabs, tabIndex, setTabIndex, sx }) => {
    const visibleTabs = tabs.filter(tab => tab.condition !== false);

    const [internalIndex, setInternalIndex] = useState(0);
    const currentIndex = tabIndex != null ? tabIndex : internalIndex;
    const updateIndex = setTabIndex || setInternalIndex;

    return (
        <Box>
            <Tabs
                value={currentIndex}
                onChange={(_, newIndex) => updateIndex(newIndex)}
                sx={sx}
            >
                {visibleTabs.map((tab, index) => (
                    <Tab key={index} label={tab.label} />
                ))}
            </Tabs>

            {visibleTabs.map((tab, index) => (
                <TabPanel key={index} value={currentIndex} index={index}>
                    {tab.content}
                </TabPanel>
            ))}
        </Box>
    );
};

export default TabbedFormLayout;
