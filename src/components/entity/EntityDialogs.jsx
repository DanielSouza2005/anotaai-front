import { useTextUtils } from '../../hooks/useTextUtils';
import BaseDialog, { DIALOG_MODES } from '../utils/dialogs/components/BaseDialog';
import ConfirmDialog from '../utils/dialogs/ConfirmDialog';

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
    formData,

    handleCreate,
    handleEdit,
    handleDelete,
}) => {

    const { capitalizeFirstLetter } = useTextUtils();

    return (
        <>
            <BaseDialog
                open={openAddDialog}
                mode={DIALOG_MODES.CREATE}
                onClose={() => setOpenAddDialog(false)}
                onSubmit={handleCreate}
                formData={newFormData}
                fields={addfields}
                enderecoFields={addEnderecoFields}
                title={createDialogTitle}
                titleTab={titleTab}
                titleTab2={titleTab2}
                validationSchema={validationSchema}
                entity={entityName}
                usaFoto={usaFoto}
            />

            <BaseDialog
                open={openEditDialog}
                mode={DIALOG_MODES.EDIT}
                onClose={() => setOpenEditDialog(false)}
                onSubmit={handleEdit}
                formData={formData}
                fields={editFields}
                enderecoFields={editEnderecoFields}
                title={editDialogTitle}
                titleTab={titleTab}
                titleTab2={titleTab2}
                validationSchema={editValidationSchema || validationSchema}
                entity={entityName}
                usaFoto={usaFoto}
            />

            <BaseDialog
                open={openDetail}
                mode={DIALOG_MODES.VIEW}
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