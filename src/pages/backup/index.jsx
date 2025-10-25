import BackupIcon from '@mui/icons-material/Backup';
import { Box, Tab, Tabs } from "@mui/material";
import { useState } from 'react';
import BackupConfigDialog from '../../components/domain/backup/BackupConfigDialog/BackupConfigDialog';
import useBackupConfig from '../../components/domain/backup/BackupConfigDialog/hooks/useBackupConfig';
import BackupFabButton from '../../components/domain/backup/BackupFabButton/BackupFabButton';
import BackupGrid from '../../components/domain/backup/BackupGrid/BackupGrid';
import BackupLogGrid from '../../components/domain/backup/BackupLogGrid/BackupLogGrid';
import EntityHeader from "../../components/domain/entity/components/EntityHeader";

const BackupPage = () => {

    const [activeTab, setActiveTab] = useState(0);
    const [dialogOpen, setDialogOpen] = useState(false);

    const { config, saveBackupConfig } = useBackupConfig();

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    return (
        <Box
            sx={{
                margin: 0,
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                overflow: 'hidden'
            }}
        >
            <EntityHeader
                title={"Backups"}
                icon={BackupIcon}
            />

            <Tabs
                value={activeTab}
                onChange={handleTabChange}
                variant="standard"
                textColor="primary"
                indicatorColor="primary"
            >
                <Tab label="Backups" />
                <Tab label="Histórico" />
            </Tabs>

            <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden', mt: 2 }}>
                {activeTab === 0 && <BackupGrid />}
                {activeTab === 1 && <BackupLogGrid />}
            </Box>

            <BackupFabButton
                color="primary"
                onClick={() => setDialogOpen(true)}
            />

            <BackupConfigDialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                initialValues={config}
                onSubmit={saveBackupConfig}
            />

        </Box>
    )
}

export default BackupPage;