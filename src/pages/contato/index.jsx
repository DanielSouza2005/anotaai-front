import EntityGridPage from '../../components/entity/EntityGridPage';
import {
    addContatoEnderecoFields, addContatoFields, contatoFields, editContatoEnderecoFields, editContatoFields,
    empresaFields, enderecoFields, searchContatoFields
} from './config/fields';
import { contatoValidationSchema } from './config/validation';
import { gridContatoColumns } from './config/columns';

const ContatosPage = () => {

    return (
        <EntityGridPage
            entityName={"contato"}
            title={"Lista de Contatos"}
            columns={gridContatoColumns}
            detailFields={contatoFields}
            detailEnderecoFields={enderecoFields}
            detailEmpresaFields={empresaFields}
            addfields={addContatoFields}
            addEnderecoFields={addContatoEnderecoFields}
            editFields={editContatoFields}
            editEnderecoFields={editContatoEnderecoFields}
            createDialogTitle={"Novo Contato"}
            editDialogTitle={"Atualizar Contato"}
            detailDialogTitle={"Detalhes do Contato"}
            titleTab={"Contato"}
            titleTab2={"Endereço"}
            searchFields={searchContatoFields}
            validationSchema={contatoValidationSchema}
        />
    );
}

export default ContatosPage;