import { Box, Paper } from "@mui/material";
import { toast } from "react-toastify";
import { ENTITY_NAMES } from "../../../../config/entity/entityConfig";
import { useEntityUtils } from "../../../../hooks/useEntityUtils";
import { BackupColums } from "../../../../pages/backup/config/columns";
import EntityTable from "../../entity/components/EntityTable";
import useEntity from "../../entity/hooks/useEntity";
import BackupRowMenu from "../BackupRowMenu/BackupRowMenu";

const BackupGrid = () => {

    const entityName = ENTITY_NAMES.BACKUP;
    const { getEntityIdKey } = useEntityUtils();

    const {
        rows, page, setPage, pageSize, setPageSize, totalRows, loading, selectedRowId,
        handleMenuOpen, anchorEl, handleMenuClose, handleDownload
    } = useEntity(entityName);

    return (
        <>
            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: 0,
                    overflow: 'hidden'
                }}
            >
                <Paper
                    elevation={0}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        flex: 1,
                        minHeight: 0,
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
                        columns={BackupColums}
                        loading={loading}
                        totalRows={totalRows}
                        page={page}
                        pageSize={pageSize}
                        setPage={setPage}
                        setPageSize={setPageSize}
                        handleMenuOpen={handleMenuOpen}
                    />

                </Paper>
            </Box>

            <BackupRowMenu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                onDownload={() => {
                    const selectedBackup = rows.find(row => row[getEntityIdKey(entityName)] === selectedRowId);

                    if (selectedBackup) {
                        handleDownload(selectedBackup.caminho_arquivo);
                    } else {
                        toast.error("Backup selecionado não encontrado.");
                    }
                }}
            />
        </>
    );
}

export default BackupGrid;