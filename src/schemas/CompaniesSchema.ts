/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import { Schema, model, Model, Document } from 'mongoose';
import ICompanies from '../interfaces/ICompanies';
import PartnersSchema from './PartnersSchema';

export interface CompaniesModel extends ICompanies, Document {}

const CompaniesSchema = new Schema({
  cnpj: String,
  razao_social: String,
  uf: String,
  qsa: [PartnersSchema]
});

CompaniesSchema.set('toJSON', {
  getters: true,
  virtuals: false,
  transform(doc, ret) {
    delete ret.__v;
    delete ret._id;
  }
});

export const Companies: Model<CompaniesModel> = model<CompaniesModel>(
  'companies',
  CompaniesSchema
);
