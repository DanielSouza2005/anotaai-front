import { useTextUtils } from '../../hooks/useTextUtils';
import ConfirmDialog from '../utils/dialogs/ConfirmDialog';
import CreateDialog from '../utils/dialogs/CreateDialog';
import DetailDialog from '../utils/dialogs/DetailDialog';
import EditDialog from '../utils/dialogs/EditDialog';

const EntityDialogs = ({
    entityName,
    titleTab,
    titleTab2,
    validationSchema,
    editValidationSchema,
    createDialogTitle,
    editDialogTitle,
    detailDialogTitle,
    detailFields,
    addfields,
    addEnderecoFields,
    editFields,
    editEnderecoFields,
    detailEnderecoFields = [],
    detailEmpresaFields = [],
    usaFoto,

    openAddDialog,
    setOpenAddDialog,
    openEditDialog,
    setOpenEditDialog,
    openDetail,
    setOpenDetail,
    openConfirmDelete,
    setOpenConfirmDelete,

    newFormData,
    setNewFormData,
    formData,
    setFormData,

    handleCreate,
    handleEdit,
    handleDelete,
}) => {

    const { capitalizeFirstLetter } = useTextUtils();

    return (
        <>
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
                usaFoto={usaFoto}
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
                validationSchema={editValidationSchema || validationSchema}
                entity={entityName}
                usaFoto={usaFoto}
            />

            <DetailDialog
                open={openDetail}
                onClose={() => setOpenDetail(false)}
                formData={formData}
                title={detailDialogTitle}
                fields={detailFields}
                enderecoFields={detailEnderecoFields}
                empresaFields={detailEmpresaFields}
                titleTab={titleTab}
                titleTab2={titleTab2}
                usaFoto={usaFoto}
                entity={entityName}
            />

            <ConfirmDialog
                open={openConfirmDelete}
                onClose={() => setOpenConfirmDelete(false)}
                onConfirm={async () => {
                    await handleDelete();
                    setOpenConfirmDelete(false);
                }}
                title={`Confirmar exclusão`}
                message={`Tem certeza que deseja excluir este(a) ${capitalizeFirstLetter(entityName)}?`}
                confirmText="Excluir"
                cancelText="Cancelar"
                confirmColor="error"
            />
        </>
    );
};

export default EntityDialogs;
