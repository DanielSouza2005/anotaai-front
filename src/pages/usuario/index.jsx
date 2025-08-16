import EntityGridPage from "../../components/domain/entity/EntityGridPage";
import { gridUsuarioFields } from "./config/columns";
import { addUsuarioFields, editUsuarioFields, searchUsuarioFields, usuarioFields } from "./config/fields";
import { usuarioEditValidationSchema, usuarioValidationSchema } from "./config/validation";

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