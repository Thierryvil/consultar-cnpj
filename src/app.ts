/* eslint-disable class-methods-use-this */
import express from 'express';
import mongoose from 'mongoose';
import router from './routes';
import 'dotenv/config';

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.middlewares();
    this.database();
  }

  private middlewares(): void {
    this.express.use(router);
    this.express.use(express.json());
  }

  private database(): void {
    try {
      mongoose.connect(
        'mongodb://localhost:27017/consultar_cnpj',
        {
          useUnifiedTopology: true,
          useNewUrlParser: true
        },
        () => console.log('Database Connected')
      );
    } catch (error) {
      console.error(error.message);
    }
  }
}

export default new App().express;