import * as Yup from 'yup';
import { removeMask } from '../../../utils/removeMask';

const cleanValue = (value) => {
  if (typeof value === 'string') {
    return removeMask(value);
  }
  return value;
};

const contatoValidationSchema = Yup.object({
  nome: Yup.string()
    .required('Nome é obrigatório'),

  cod_empresa: Yup.number()
    .nullable(),

  cpf: Yup.string()
    .transform(v => cleanValue(v) || null)
    .nullable()
    .matches(/^\d{11}$/, 'CPF deve conter exatamente 11 números')
    .notRequired(),

  telefones: Yup.array()
    .of(
      Yup.string()
        .transform(v => v?.replace(/\D/g, '') || null)
        .nullable()
        .matches(/^\d{10,11}$/, 'Telefone deve conter entre 10 e 11 números')
    )
    .nullable(),

  emails: Yup.array()
    .of(
      Yup.string()
        .transform(v => (v === '' ? null : v))
        .nullable()
        .email('E-mail inválido')
    )
    .nullable(),

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
      .transform(v => cleanValue(v) || null)
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

export { contatoValidationSchema };
