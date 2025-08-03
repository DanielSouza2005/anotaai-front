import EntityGridPage from "../../components/entity/EntityGridPage";
import { addEmpresaEnderecoFields, addEmpresaFields, editEmpresaEnderecoFields, editEmpresaFields, empresaEnderecoFields, empresaFields, gridEmpresaFields, searchEmpresaFields } from "./empresaFields";
import { empresaValidationSchema } from "./empresaValidation";

const EmpresasPage = () => {

    return (
        <EntityGridPage
            entityName={"empresa"}
            title={"Lista de Empresas"}
            columns={gridEmpresaFields}
            detailFields={empresaFields}
            detailEnderecoFields={empresaEnderecoFields}
            addfields={addEmpresaFields}
            addEnderecoFields={addEmpresaEnderecoFields}
            editFields={editEmpresaFields}
            editEnderecoFields={editEmpresaEnderecoFields}
            createDialogTitle={"Nova Empresa"}
            editDialogTitle={"Atualizar Empresa"}
            detailDialogTitle={"Detalhes da Empresa"}
            titleTab={"Empresa"}
            titleTab2={"Endereço"}
            searchFields={searchEmpresaFields}
            validationSchema={empresaValidationSchema}
        />
    );
}

export default EmpresasPage;