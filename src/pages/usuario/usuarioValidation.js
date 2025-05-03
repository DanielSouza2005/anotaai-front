import * as Yup from 'yup';

const usuarioValidationSchema = Yup.object({
    nome: Yup.string()
        .required('O Nome não pode estar em branco.'),

    email: Yup.string()
        .transform(v => (v === '' ? null : v))
        .required('O Email não pode estar em branco.')
        .email('Email pessoal inválido'),

    senha: Yup.string()
        .required('A Senha não pode estar em branco.')
});

const usuarioEditValidationSchema = Yup.object({
    nome: Yup.string()
        .required('O Nome não pode estar em branco.')
});

export { usuarioValidationSchema, usuarioEditValidationSchema };