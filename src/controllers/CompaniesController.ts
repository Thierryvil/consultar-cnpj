/* eslint-disable class-methods-use-this */
/* eslint-disable eqeqeq */
import { Request, Response } from 'express';
import axios from 'axios';
import { Comapanies, CompaniesModel } from '../schemas/CompaniesSchema';
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

class ComapaniesController {
  public getCompanie(req: Request, res: Response): Promise<void> {
    if (!req.query.type) res.status(404).send('Type not found.');
    if (!req.query.cnpj) res.status(404).send('CNPJ not found.');

    const { type, cnpj } = req.query;

    if (type == 'cacheado') {
      Comapanies.findOne({ cnpj }).exec(
        async (err: string, companie: CompaniesModel) => {
          if (err) return console.log(err);
          if (!companie) {
            console.log('tempo_real');

            const companieResponse = await axiosMakeRequest(
              BASE_URL + ENDPOINT_EMPRESA + cnpj
            );

            const newCompanie = companieResponse.data.results[0];

            const partnersResponse = await axiosMakeRequest(
              BASE_URL + ENDPOINT_SOCIOS + cnpj
            );

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

            const comp = new Comapanies({
              cnpj: newCompanie.cnpj,
              razao_social: newCompanie.razao_social,
              uf: newCompanie.uf,
              qsa: partnersList
            });

            return res.status(200).send({
              cnpj: comp.cnpj,
              razao_social: comp.razao_social,
              uf: comp.uf,
              qsa: comp.qsa
            });
          }

          console.log('cacheado');
          return res.status(200).send({
            cnpj: companie.cnpj,
            razao_social: companie.razao_social,
            uf: companie.uf,
            qsa: companie.qsa
          });
        }
      );
    } else if (type == 'tempo_real') return res.status(200);
    else return res.status(401).send('Invalid type.');
  }
}

export default new ComapaniesController();
