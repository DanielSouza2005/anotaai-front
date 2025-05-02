import React from 'react';
import EntityGridPage from '../../components/entity/EntityGridPage';
import { addContatoEnderecoFields, addContatoFields, contatoFields, editContatoEnderecoFields, editContatoFields, enderecoFields, gridContatoColumns, searchContatoFields } from './contatoFields';
import { contatoValidationSchema } from './contatoValidation';

const ContatosPage = () => {

    return (
        <EntityGridPage
            entityName={"contato"}
            title={"Lista de Contatos"}
            columns={gridContatoColumns}
            detailFields={contatoFields}
            detailEnderecoFields={enderecoFields}
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