import express = require('express');
import * as openapi from 'express-openapi';
import * as bodyParser from 'body-parser';
import * as fs from 'fs';
import * as yaml from 'js-yaml';
import cors from "cors";

export default class Server {
  private m_port: number = 10080;
  private m_app = express();

  constructor () {
    const api = yaml.safeLoad(fs.readFileSync('./api.yml', 'utf-8'));
    this.m_app.use(cors());
    openapi.initialize({
      app: this.m_app,
      apiDoc: api,
      paths: './dist/api',
      consumesMiddleware: {
        'application/json': bodyParser.json(),
        'text/text': bodyParser.text()
      },
      errorMiddleware: (err, req, res, next) => {
        res.status(400);
        res.json(err);
      },
      errorTransformer: (openapi, jsonschema) => {
        return openapi;
      },
      docsPath: '/schema',
      exposeApiDocs: true
    });
  }

  start () {
    this.m_app.listen(this.m_port, () => {
      console.log(`listening on ${this.m_port}`);
    });
  }
}
