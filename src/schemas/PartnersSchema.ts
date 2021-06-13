import { Schema } from 'mongoose';

const PartnersSchema = new Schema(
  {
    cpf_cnpj_socio: String,
    nome_socio: String,
    qualificacao_socio: String,
    tipo_socio: String
  },
  { _id: false }
);

export default PartnersSchema;
