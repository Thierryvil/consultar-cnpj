import { Schema, model, Model, Document } from 'mongoose';
import ICompanies from '../interfaces/ICompanies';

export interface CompaniesModel extends ICompanies, Document {}

const ComapaniesSchema = new Schema({
  cnpj: String,
  razao_social: String,
  uf: String,
  qsa: [
    {
      cpf_cnpj_socio: String,
      nome_socio: String,
      qualificacao_socio: String,
      tipo_socio: String
    }
  ]
});

ComapaniesSchema.options.toJSON = {
  transform(doc, ret, options) {
    ret.id = ret.id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
};

export const Comapanies: Model<CompaniesModel> = model<CompaniesModel>(
  'comapanies',
  ComapaniesSchema
);
