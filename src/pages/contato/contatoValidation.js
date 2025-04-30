import * as Yup from 'yup';

const contatoValidationSchema = Yup.object({
  nome: Yup.string()
    .required('Nome é obrigatório'),

  cod_empresa: Yup.number()
    .nullable(),

  cpf: Yup.string()
    .transform(v => (v === '' ? null : v))
    .nullable()
    .matches(/^\d{11}$/, 'CPF deve conter exatamente 11 números')
    .notRequired(),

  celular: Yup.string()
    .transform(v => (v === '' ? null : v))
    .nullable()
    .matches(/^\d{11}$/, 'Celular deve conter exatamente 11 números')
    .notRequired(),

  telefone: Yup.string()
    .transform(v => (v === '' ? null : v))
    .nullable()
    .matches(/^\d{10}$/, 'Telefone deve conter exatamente 10 números')
    .notRequired(),

  telefone2: Yup.string()
    .transform(v => (v === '' ? null : v))
    .nullable()
    .matches(/^\d{10}$/, 'Telefone 2 deve conter exatamente 10 números')
    .notRequired(),

  email_pessoal: Yup.string()
    .transform(v => (v === '' ? null : v))
    .nullable()
    .email('Email pessoal inválido'),

  email_corp: Yup.string()
    .transform(v => (v === '' ? null : v))
    .nullable()
    .email('Email corporativo inválido'),

  cargo: Yup.string()
    .transform(v => (v === '' ? null : v))
    .nullable(),

  departamento: Yup.string()
    .transform(v => (v === '' ? null : v))
    .nullable(),

  obs: Yup.string()
    .transform(v => (v === '' ? null : v))
    .nullable(),

  endereco: Yup.object({
    cep: Yup.string()
      .transform(v => (v === '' ? null : v))
      .nullable()
      .matches(/^\d{5}-?\d{3}$/, 'CEP inválido')
      .notRequired(),
  }),
});

export { contatoValidationSchema };
