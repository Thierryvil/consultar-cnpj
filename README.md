<h1 align="center">Consultar CNPJ</h1>
<p align="center">Repositorio do desafio para a vaga back-end junior na Combate à Fraude.</p>

# Desafio
Desenvolver um microsserviço capaz de armazenar e consultar dados de empresas e seus sócios pelo seu cnpj, utilizando a api do Brasil.io, utilizando Typescript e MongoDB.



## Começando

### Variaveis de Ambiente
Criaremos um arquivo **.env** para as variaveis de ambiente que iremos utilizar.
```bash
API_KEY=
MONGODB_URI=
```

**API_KEY** deve ser obtida atrás do [Brasil.io](https://brasil.io/auth/entrar/), para mais informações acesse [aqui](https://blog.brasil.io/2020/10/31/nossa-api-sera-obrigatoriamente-autenticada/).

**MONGODB_URI** é a string de conexão com o nosso banco de dados NOSQL.
```bash
mongodb://localhost:27017/consultar_cnpj
```

### Instalando pacotes
Precisamos instalar os pacotes do nosso microserviço para a execução
```bash
yarn install 
npm install
```

### Rodando projeto em desenvolvimento
```bash
yarn dev
```

### Build do projeto
```bash
yarn build
```

# Documentação

### Requisição
Para fazer uma consulta devemos informar o **type** que seria cacheado ou tempo_real, junto do **cnpj** no endpoint **/search**.
```
/search?type=cacheado&cnpj=34102645000238
/search?type=tempo_real&cnpj=34102645000238
```

### Retorno 
O microsserviço ira retornar um status code de 200 com o formato em JSON.
```JSON
{
  "cnpj": "34102645000238",
  "razao_social": "COMBATEAFRAUDE TECNOLOGIA DA INFORMACAO LTDA",
  "uf": "RS",
  "qsa": [
    {
      "cpf_cnpj_socio": "***973977**",
      "nome_socio": "LEONARDO ALVES REBITTE",
      "qualificacao_socio": "Sócio-Administrador",
      "tipo_socio": "Pessoa Física"
    },
    {
    "cpf_cnpj_socio": "***977700**",
    "nome_socio": "RAFAEL RODRIGUES VIANA",
    "qualificacao_socio": "Sócio-Administrador",
    "tipo_socio": "Pessoa Física"
    }
  ]
}
```
