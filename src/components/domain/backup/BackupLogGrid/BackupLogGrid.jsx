import { Box, Paper } from "@mui/material";
import { ENTITY_NAMES } from "../../../../config/entity/entityConfig";
import EntityTable from "../../entity/components/EntityTable";
import useEntity from "../../entity/hooks/useEntity";
import { BackupLogColums } from "../../../../pages/backup/config/backupLogColumns";

const BackupLogGrid = () => {

    const entityName = ENTITY_NAMES.BACKUP_LOG;

    const {
        rows, page, setPage, pageSize, setPageSize, totalRows, loading
    } = useEntity(entityName);

    return (
        <>
            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden'
                }}
            >
                <Paper
                    elevation={0}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        flex: 1,
                        width: '100%',
                        overflow: 'hidden',
                        '&:hover': {
                            boxShadow: '0px 4px 12px rgba(25, 118, 210, 0.2)'
                        }
                    }}
                >
                    <EntityTable
                        entityName={entityName}
                        rows={rows}
                        columns={BackupLogColums}
                        loading={loading}
                        totalRows={totalRows}
                        page={page}
                        pageSize={pageSize}
                        setPage={setPage}
                        setPageSize={setPageSize}
                    />

                </Paper>
            </Box>
        </>
    );
}

export default BackupLogGrid;