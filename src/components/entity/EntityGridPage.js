import { Add as AddIcon, EventNote, MoreVert } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, Fab, IconButton, Menu, MenuItem, Paper, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { ptBR } from '@mui/x-data-grid/locales';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../services/api/api';
import { capitalizeFirstLetter } from '../../utils/capitalize';
import { getEntityIdKey, getEntityLabel } from '../../utils/entityUtils';
import { formatValue } from '../../utils/Masks';
import AdvancedSearchBar from '../search/AdvancedSearchBar';
import ConfirmDialog from '../utils/dialogs/ConfirmDialog';
import CreateDialog from '../utils/dialogs/CreateDialog';
import DetailDialog from '../utils/dialogs/DetailDialog';
import EditDialog from '../utils/dialogs/EditDialog';

const EntityGridPage = ({
    entityName,
    title,
    columns,
    detailFields,
    detailEnderecoFields = [],
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
    const [rows, setRows] = useState([]);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(100);
    const [totalRows, setTotalRows] = useState(0);
    const [loading, setLoading] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRowId, setSelectedRowId] = useState(null);
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openDetail, setOpenDetail] = useState(false);
    const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
    const [newFormData, setNewFormData] = useState({});
    const [formData, setFormData] = useState({});
    const [filters, setFilters] = useState([]);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();

            filters.forEach(filter => {
                params.append(filter.field, filter.value);
            });

            params.append('page', page);
            params.append('size', pageSize);

            const { data } = await api.get(`/${entityName}?${params.toString()}`);
            setRows(data.content);
            setTotalRows(data.totalElements);
        } catch (err) {
            toast.error('Erro ao buscar dados.' + err);
        } finally {
            setLoading(false);
        }
    }, [entityName, page, pageSize, filters]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const columnsWithActions = useMemo(() => {
        const hasAcoes = columns.some(col => col.field === 'acoes');

        const newColumns = columns.map(col => {
            if (col.valueFormatter || col.valueGetter || col.renderCell) return col;
            return {
                ...col,
                valueFormatter: (params) => formatValue(col, params),
            };
        });

        if (!hasAcoes) {
            newColumns.push({
                field: 'acoes',
                headerName: '',
                width: 50,
                sortable: false,
                renderCell: (params) => (
                    <IconButton onClick={(event) => handleMenuOpen(event, params.row[getEntityIdKey(entityName)])}>
                        <MoreVert />
                    </IconButton>
                ),
            });
        }

        return newColumns;
    }, [columns, entityName]);

    const handleRowDoubleClick = (params) => {
        setFormData(params.row);
        setOpenDetail(true);
    };

    const handleMenuOpen = (event, rowId) => {
        setAnchorEl(event.currentTarget);
        setSelectedRowId(rowId);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedRowId(null);
        handleClose();
    };

    const handleClose = () => {
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }
    };

    const handleDetails = () => {
        const idKey = getEntityIdKey(entityName);
        const rowToView = rows.find(row => row[idKey] === selectedRowId);

        if (rowToView) {
            setFormData(rowToView);
            setOpenDetail(true);
        }

        handleMenuClose();
    };

    const handleEditEntity = () => {
        const idKey = getEntityIdKey(entityName);
        const rowToEdit = rows.find(row => row[idKey] === selectedRowId);

        setFormData(rowToEdit);
        setOpenEditDialog(true);
        handleMenuClose();
    };

    const handleCreate = async (values, { setSubmitting, setErrors }) => {
        try {
            if (entityName === "contato" || entityName === "usuario") {
                const formData = new FormData();
                const { foto, dados } = values;

                formData.append(
                    'dados',
                    new Blob([JSON.stringify(dados)], { type: 'application/json' })
                );

                if (foto) {
                    formData.append('foto', foto);
                }

                await api.post(`/${entityName}`, formData);
            }
            else {
                await api.post(`/${entityName}`, values);
            }

            fetchData();
            toast.success(`${getEntityLabel(entityName)} incluído(a) com sucesso!`);
            setOpenAddDialog(false);
        } catch (error) {
            if (error.response && error.response.data) {
                const apiErrors = error.response.data;

                if (Array.isArray(apiErrors)) {
                    const formikErrors = {};
                    apiErrors.forEach(err => {
                        if (err.campo.includes('.')) {
                            const [obj, field] = err.campo.split('.');
                            formikErrors[obj] = {
                                ...(formikErrors[obj] || {}),
                                [field]: err.mensagem
                            };
                        } else {
                            formikErrors[err.campo] = err.mensagem;
                        }
                    });

                    setErrors(formikErrors);
                } else {
                    toast.error(apiErrors.message || `Erro inesperado ao criar ${getEntityLabel(entityName)}.`);
                }
            } else {
                toast.error(`Erro ao criar ${getEntityLabel(entityName)}. Tente novamente.`);
            }
        } finally {
            setSubmitting(false);
        }
    };

    const handleEdit = async (values, { setSubmitting, setErrors }) => {
        try {
            if (entityName === "contato" || entityName === "usuario") {
                const formData = new FormData();
                const { foto, ...dados } = values;

                formData.append(
                    'dados',
                    new Blob([JSON.stringify(dados.dados)], { type: 'application/json' })
                );

                if (foto) {
                    formData.append('foto', foto);
                }

                await api.put(`/${entityName}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            }
            else {
                await api.put(`/${entityName}`, values);
            }

            fetchData();
            toast.success(`${getEntityLabel(entityName)} atualizado(a) com sucesso!`);
            setOpenEditDialog(false);
        } catch (error) {
            if (error.response && error.response.data) {
                const apiErrors = error.response.data;

                if (Array.isArray(apiErrors)) {
                    const formikErrors = {};
                    apiErrors.forEach(err => {
                        if (err.campo.includes('.')) {
                            const [obj, field] = err.campo.split('.');
                            formikErrors[obj] = {
                                ...(formikErrors[obj] || {}),
                                [field]: err.mensagem
                            };
                        } else {
                            formikErrors[err.campo] = err.mensagem;
                        }
                    });

                    setErrors(formikErrors);
                } else {
                    toast.error(apiErrors.message || `Erro inesperado ao atualizar ${getEntityLabel(entityName)}.`);
                }
            } else {
                toast.error(`Erro ao atualizar ${getEntityLabel(entityName)}.`);
            }
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async () => {
        try {
            await api.delete(`/${entityName}/${selectedRowId}`);
            fetchData();
            toast.success(`${getEntityLabel(entityName)} excluído(a) com sucesso!`);
        } catch (error) {
            toast.error(`Erro ao excluir ${getEntityLabel(entityName)}. ` + error.response.data);
        }
        handleMenuClose();
    };

    return (
        <Box
            sx={{ margin: 0, padding: 0 }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <EventNote sx={{ color: 'blue', marginRight: 1 }} />
                <Typography variant="h5" fontWeight="bold">
                    {title}
                </Typography>
            </Box>

            <AdvancedSearchBar
                fieldsAvailable={searchFields}
                onFilterChange={(filters) => {
                    setFilters(filters);
                }}
            />

            <Paper elevation={1}>
                <Box sx={{ height: 500 }}>
                    <DataGrid
                        rows={rows}
                        columns={columnsWithActions}
                        loading={loading}
                        rowCount={totalRows}
                        paginationMode="server"
                        paginationModel={{ page, pageSize }}
                        onPaginationModelChange={(model) => {
                            setPage(model.page);
                            setPageSize(model.pageSize);
                        }}
                        disableRowSelectionOnClick
                        onRowDoubleClick={handleRowDoubleClick}
                        localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
                        getRowId={(row) => row[getEntityIdKey(entityName)]}
                        getRowClassName={(params) =>
                            params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                        }
                        sx={{
                            '& .even': {
                                backgroundColor: '#f3f3f3',
                            },
                            '& .odd': {
                                backgroundColor: '#ffffff',
                            },
                            '& .MuiDataGrid-row:hover': {
                                backgroundColor: '#e3f2fd',
                            },
                        }}
                    />
                </Box>
            </Paper>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                    sx: {
                        borderRadius: 2,
                        minWidth: 150,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    },
                }}
            >
                <MenuItem onClick={handleEditEntity} sx={{ gap: 1, py: 1 }}>
                    <EditIcon fontSize="small" sx={{ color: 'primary.main' }} />
                    <Typography variant="body2">Editar</Typography>
                </MenuItem>

                <MenuItem onClick={() => {
                    setOpenConfirmDelete(true);
                    setAnchorEl(null);
                }} sx={{ gap: 1, py: 1 }}>
                    <DeleteIcon fontSize="small" sx={{ color: 'error.main' }} />
                    <Typography variant="body2">Excluir</Typography>
                </MenuItem>

                <MenuItem onClick={handleDetails} sx={{ gap: 1, py: 1 }}>
                    <InfoOutlinedIcon fontSize="small" sx={{ color: 'info.main' }} />
                    <Typography variant="body2">Detalhes</Typography>
                </MenuItem>
            </Menu>

            <Fab
                color="primary"
                sx={{ position: 'fixed', bottom: 16, right: 16 }}
                onClick={() => {
                    setNewFormData({});
                    setOpenAddDialog(true);
                }}
            >
                <AddIcon />
            </Fab>

            <CreateDialog
                open={openAddDialog}
                onClose={() => setOpenAddDialog(false)}
                onCreate={handleCreate}
                formData={newFormData}
                onChange={(e) =>
                    setNewFormData(prev => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                    }))
                }
                fields={addfields}
                enderecoFields={addEnderecoFields}
                title={createDialogTitle}
                titleTab={titleTab}
                titleTab2={titleTab2}
                validationSchema={validationSchema}
                entity={entityName}
                usaFoto={entityName === "contato" || entityName === "usuario"}
            />

            <EditDialog
                open={openEditDialog}
                onClose={() => setOpenEditDialog(false)}
                onSave={handleEdit}
                formData={formData}
                onChange={(e) =>
                    setFormData(prev => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                    }))
                }
                fields={editFields}
                enderecoFields={editEnderecoFields}
                title={editDialogTitle}
                titleTab={titleTab}
                titleTab2={titleTab2}
                validationSchema={editValidationSchema ? editValidationSchema : validationSchema}
                entity={entityName}
                usaFoto={entityName === "contato" || entityName === "usuario"}
            />

            <DetailDialog
                open={openDetail}
                onClose={() => setOpenDetail(false)}
                formData={formData}
                title={detailDialogTitle}
                fields={detailFields}
                enderecoFields={detailEnderecoFields}
                titleTab={titleTab}
                titleTab2={titleTab2}
                usaFoto={entityName === "contato" || entityName === "usuario"}
                entity={entityName}
            />

            <ConfirmDialog
                open={openConfirmDelete}
                onClose={() => setOpenConfirmDelete(false)}
                onConfirm={async () => {
                    await handleDelete();
                    setOpenConfirmDelete(false);
                    setSelectedRowId(null);
                }}
                title={`Confirmar exclusão`}
                message={`Tem certeza que deseja excluir este(a) ${capitalizeFirstLetter(entityName)}?`}
                confirmText="Excluir"
                cancelText="Cancelar"
                confirmColor="error"
            />
        </Box>
    );
};

export default EntityGridPage;