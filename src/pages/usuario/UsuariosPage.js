import EntityGridPage from "../../components/entity/EntityGridPage";
import { addUsuarioFields, editUsuarioFields, gridUsuarioFields, searchUsuarioFields, usuarioFields } from "./usuarioFields";
import { usuarioEditValidationSchema, usuarioValidationSchema } from "./usuarioValidation";

const UsuariosPage = () => {

    return (
        <EntityGridPage
            entityName={"usuario"}
            title={"Lista de Usuários"}
            columns={gridUsuarioFields}
            detailFields={usuarioFields}
            addfields={addUsuarioFields}
            editFields={editUsuarioFields}
            createDialogTitle={"Novo Usuário"}
            editDialogTitle={"Atualizar Usuário"}
            detailDialogTitle={"Detalhes do Usuário"}
            titleTab={"Usuário"}
            searchFields={searchUsuarioFields}
            validationSchema={usuarioValidationSchema}
            editValidationSchema={usuarioEditValidationSchema}
        />
    );
}

export default UsuariosPage;