/* eslint-disable eqeqeq */
/* eslint-disable class-methods-use-this */
import { Request, Response } from 'express';
import axios from 'axios';
import { Companies, CompaniesModel } from '../schemas/CompaniesSchema';
import {
  BASE_URL,
  ENDPOINT_EMPRESA,
  ENDPOINT_SOCIOS
} from '../common/constants';

async function axiosMakeRequest(url: string) {
  return axios.get(url, {
    headers: { Authorization: `Token ${process.env.API_KEY}` }
  });
}

async function getCompanieInRealTime(cnpj: string): Promise<CompaniesModel> {
  const companieResponse = await axiosMakeRequest(
    BASE_URL + ENDPOINT_EMPRESA + cnpj
  );
  const newCompanie = companieResponse.data.results[0];

  const partnersResponse = await axiosMakeRequest(
    BASE_URL + ENDPOINT_SOCIOS + cnpj
  );

  console.log(partnersResponse.status);
  const partners = partnersResponse.data.results;
  const partnersList: Object[] = [];

  Object.keys(partners).forEach((key) => {
    const value = partners[key];
    partnersList.push({
      cpf_cnpj_socio: value.cpf_cnpj_socio,
      nome_socio: value.nome_socio,
      qualificacao_socio: value.qualificacao_socio,
      tipo_socio: value.tipo_socio
    });
  });

  return new Companies({
    cnpj: newCompanie.cnpj,
    razao_social: newCompanie.razao_social,
    uf: newCompanie.uf,
    qsa: partnersList
  });
}

class ComapaniesController {
  public async getCompanie(req: Request, res: Response): Promise<Response> {
    try {
      if (!req.query.type) res.status(404).send('Type not found.');
      if (!req.query.cnpj) res.status(404).send('CNPJ not found.');

      const searchType = req.query.type.toString();
      const cnpj = req.query.cnpj.toString();

      if (searchType == 'cacheado') {
        Companies.findOne({ cnpj }).exec(
          async (err: string, companie: CompaniesModel) => {
            if (err) return console.log(err);
            if (!companie) {
              // tempo real dentro de cacheado
              const comp = await getCompanieInRealTime(cnpj);
              comp.save();

              return res.status(200).send(comp.toJSON());
            }

            // cacheado
            return res.status(200).send(companie.toJSON());
          }
        );
      } else if (searchType == 'tempo_real') {
        const comp = await getCompanieInRealTime(cnpj);
        await Companies.findOneAndReplace({ cnpj: comp.cnpj }, comp.toJSON(), {
          upsert: true
        });

        return res.status(200).send(comp.toJSON());
      } else return res.status(400).send('Invalid type.');
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
  }
}

export default new ComapaniesController();
