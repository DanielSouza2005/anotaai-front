import * as Yup from 'yup';

const empresaValidationSchema = Yup.object({
  razao: Yup.string()
    .required('A razão social não pode estar em branco.'),

  fantasia: Yup.string()
    .required('O nome fantasia não pode estar em branco.'),

  cnpj: Yup.string()
    .required('O CNPJ não pode estar em branco.')
    .matches(/^\d{14}$/, 'O CNPJ deve conter exatamente 14 dígitos numéricos.'),

  ie: Yup.string()
    .transform(v => (v === '' ? null : v))
    .nullable()
    .matches(/^\d{8,14}$/, 'A inscrição estadual deve conter entre 8 e 14 dígitos.'),

  endereco: Yup.object({
    cep: Yup.string()
      .transform(v => (v === '' ? null : v))
      .nullable()
      .matches(/^\d{5}-?\d{3}$/, 'CEP inválido')
      .notRequired(),
    rua: Yup.string()
      .transform(v => (v === '' ? null : v))
      .nullable(),
    bairro: Yup.string()
      .transform(v => (v === '' ? null : v))
      .nullable(),
    cidade: Yup.string()
      .transform(v => (v === '' ? null : v))
      .nullable(),
    uf: Yup.string()
      .transform(v => (v === '' ? null : v))
      .nullable()
      .length(2, 'UF deve conter 2 letras'),
    numero: Yup.string()
      .transform(v => (v === '' ? null : v))
      .nullable(),
    complemento: Yup.string()
      .transform(v => (v === '' ? null : v))
      .nullable(),
    pais: Yup.string()
      .transform(v => (v === '' ? null : v))
      .nullable(),
  }),
});

export { empresaValidationSchema };