/* eslint-disable camelcase */
interface ICompanies {
  cnpj: string;
  razao_social: string;
  uf: string;
  qsa: [
    {
      cpf_cnpj_socio: String;
      nome_socio: String;
      qualificacao_socio: String;
      tipo_socio: String;
    }
  ];
}

export default ICompanies;
