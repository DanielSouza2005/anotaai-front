import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../../../services/api/api';
import { useEntityUtils } from '../../../../hooks/useEntityUtils';
import { getEntityBehavior } from '../../../../config/entity/entityConfig';

export default function useEntity(entityName) {
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
    const [showFilters, setShowFilters] = useState(false);

    const { getEntityIdKey, getEntityLabel } = useEntityUtils();
    const behavior = getEntityBehavior(entityName);
    const usaFoto = behavior.hasPhoto;

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
            toast.error('Erro ao buscar dados. ' + err);
        } finally {
            setLoading(false);
        }
    }, [entityName, page, pageSize, filters]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleMenuOpen = (event, rowId) => {
        setAnchorEl(event.currentTarget);
        setSelectedRowId(rowId);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedRowId(null);
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
        if (rowToEdit) {
            setFormData(rowToEdit);
            setOpenEditDialog(true);
        }
        handleMenuClose();
    };

    const handleCreate = async (values, { setSubmitting, setErrors }, finish) => {
        try {
            setSubmitting(true);

            if (usaFoto) {
                const formData = buildMultipartPayload(values);
                await api.post(`/${entityName}`, formData);
            } else {
                await api.post(`/${entityName}`, values);
            }

            fetchData();
            toast.success(`${getEntityLabel(entityName)} incluído(a) com sucesso!`);
            setOpenAddDialog(false);
        } catch (error) {
            handleApiError(error, setErrors, entityName, 'criar', getEntityLabel);
        } finally {
            setSubmitting(false);
            finish();
        }
    };

    const handleEdit = async (values, { setSubmitting, setErrors }, finish) => {
        try {
            setSubmitting(true);

            if (usaFoto) {
                const formData = buildMultipartPayload(values);
                await api.put(`/${entityName}`, formData);
            } else {
                await api.put(`/${entityName}`, values);
            }

            fetchData();
            toast.success(`${getEntityLabel(entityName)} atualizado(a) com sucesso!`);
            setOpenEditDialog(false);
        } catch (error) {
            handleApiError(error, setErrors, entityName, 'atualizar', getEntityLabel);
        } finally {
            setSubmitting(false);
            finish();
        }
    };

    const handleDelete = async () => {
        try {
            await api.delete(`/${entityName}/${selectedRowId}`);
            fetchData();
            toast.success(`${getEntityLabel(entityName)} excluído(a) com sucesso!`);
        } catch (error) {
            toast.error(`Erro ao excluir ${getEntityLabel(entityName)}. ${error.response?.data || ''}`);
        }
        handleMenuClose();
    };

    const handleRowDoubleClick = useCallback((params) => {
        setFormData(params.row);
        setOpenDetail(true);
    }, []);

    return {
        rows,
        page,
        setPage,
        pageSize,
        setPageSize,
        totalRows,
        loading,

        anchorEl,
        selectedRowId,
        openAddDialog,
        openEditDialog,
        openDetail,
        openConfirmDelete,
        newFormData,
        formData,
        filters,
        showFilters,

        setShowFilters,
        setFilters,
        setOpenAddDialog,
        setOpenEditDialog,
        setOpenDetail,
        setOpenConfirmDelete,
        setNewFormData,
        setFormData,
        setAnchorEl,

        handleMenuOpen,
        handleMenuClose,
        handleDetails,
        handleEditEntity,
        handleCreate,
        handleEdit,
        handleDelete,
        handleRowDoubleClick,
    };
}

function handleApiError(error, setErrors, entityName, actionVerb, getEntityLabel) {
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
            toast.error(apiErrors.message || `Erro inesperado ao ${actionVerb} ${getEntityLabel(entityName)}.`);
        }
    } else {
        toast.error(`Erro ao ${actionVerb} ${getEntityLabel(entityName)}. Tente novamente.`);
    }
}

function buildMultipartPayload(values) {
    const formData = new FormData();
    const { foto, dados } = values;
    formData.append('dados', new Blob([JSON.stringify(dados)], { type: 'application/json' }));
    if (foto) formData.append('foto', foto);
    return formData;
}
