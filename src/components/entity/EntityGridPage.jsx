import { Box, Paper } from '@mui/material';
import useEntity from './hooks/useEntity';
import EntityHeader from './components/EntityHeader';
import EntityToolbar from './components/EntityToolbar';
import EntityFilters from './components/EntityFilters';
import EntityTable from './components/EntityTable';
import EntityRowMenu from './components/EntityRowMenu';
import EntityFabButton from './components/EntityFabButton';
import EntityDialogs from './components/EntityDialogs';

const EntityGridPage = ({
    entityName,
    title,
    columns,
    detailFields,
    detailEnderecoFields = [],
    detailEmpresaFields = [],
    addfields,
    addEnderecoFields = [],
    editFields,
    editEnderecoFields = [],
    createDialogTitle,
    editDialogTitle,
    detailDialogTitle,
    titleTab,
    titleTab2,
    searchFields,
    validationSchema,
    editValidationSchema
}) => {
    const {
        rows, page, setPage, pageSize, setPageSize, totalRows, loading,
        anchorEl, openAddDialog, openEditDialog, openDetail, openConfirmDelete,
        newFormData, formData, showFilters,
        setShowFilters, setFilters, setOpenAddDialog, setOpenEditDialog, setOpenDetail,
        setOpenConfirmDelete, setNewFormData, setFormData, setAnchorEl,
        handleMenuOpen, handleMenuClose, handleDetails, handleEditEntity,
        handleCreate, handleEdit, handleDelete, handleRowDoubleClick,
    } = useEntity(entityName);

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
                title={title}
            />

            <Paper
                elevation={0}
                sx={{
                    backgroundColor: '#fafafa',
                    padding: showFilters ? 2 : 1,
                    borderRadius: 2,
                    border: '1px solid #e0e0e0',
                    mb: 2,
                }}
            >
                <EntityToolbar
                    showFilters={showFilters}
                    onToggleFilters={() => setShowFilters(!showFilters)}
                />

                <EntityFilters
                    showFilters={showFilters}
                    fieldsAvailable={searchFields}
                    onFilterChange={(filters) => {
                        setFilters(filters);
                    }}
                />
            </Paper>

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
                        columns={columns}
                        loading={loading}
                        totalRows={totalRows}
                        page={page}
                        pageSize={pageSize}
                        setPage={setPage}
                        setPageSize={setPageSize}
                        handleRowDoubleClick={handleRowDoubleClick}
                        handleMenuOpen={handleMenuOpen}
                    />
                </Paper>
            </Box>

            <EntityRowMenu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                onEdit={handleEditEntity}
                onDelete={() => {
                    setOpenConfirmDelete(true);
                    setAnchorEl(null);
                }}
                onDetails={handleDetails}
            />

            <EntityFabButton
                color="primary"
                onClick={() => {
                    setNewFormData({});
                    setOpenAddDialog(true);
                }}
            />

            <EntityDialogs
                entityName={entityName}
                createDialogTitle={createDialogTitle}
                editDialogTitle={editDialogTitle}
                detailDialogTitle={detailDialogTitle}
                titleTab={titleTab}
                titleTab2={titleTab2}
                validationSchema={validationSchema}
                editValidationSchema={editValidationSchema}
                addfields={addfields}
                addEnderecoFields={addEnderecoFields}
                editFields={editFields}
                editEnderecoFields={editEnderecoFields}
                detailFields={detailFields}
                detailEnderecoFields={detailEnderecoFields}
                detailEmpresaFields={detailEmpresaFields}

                openAddDialog={openAddDialog}
                setOpenAddDialog={setOpenAddDialog}

                openEditDialog={openEditDialog}
                setOpenEditDialog={setOpenEditDialog}

                openDetail={openDetail}
                setOpenDetail={setOpenDetail}

                openConfirmDelete={openConfirmDelete}
                setOpenConfirmDelete={setOpenConfirmDelete}

                newFormData={newFormData}
                setNewFormData={setNewFormData}

                formData={formData}
                setFormData={setFormData}

                handleCreate={handleCreate}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />
        </Box>
    );
};

export default EntityGridPage;