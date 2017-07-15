import dotenv from 'dotenv';
import express from 'express';
import API from 'json-api';
import mongoose from 'mongoose';
import morgan from 'morgan';
import path from 'path';

import dbUsers from './models/users';
import authenticationService from './services/authentication';

dotenv.config();
const app = express();
mongoose.connect(process.env.MONGO, { useMongoClient: true });

if (process.env.ENV === 'dev') {
  const allowHeaders = ['Origin', 'X-Requested-With', 'Content-Type', 'Accept',
    'Cache-Control', 'Authorization'];

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', allowHeaders.join(', '));
    res.header('Access-Control-Allow-Methods',
      'POST, GET, PATCH, DELETE, OPTIONS');
    next();
  });
  app.use(morgan('dev'));
} else {
  // Serve static assets
  app.use(express.static(path.resolve(__dirname, '../../client', 'build')));
}

const models = {
  User: dbUsers.model,
};

const registryTemplates = {
  users: dbUsers.registry,
};

const opts = [
  'users',
].join('|');

const adapter = new API.dbAdapters.Mongoose(models);
const registry = new API.ResourceTypeRegistry(registryTemplates,
  { dbAdapter: adapter });

const docs = new API.controllers.Documentation(registry,
  { name: 'Omniscol' });
const controller = new API.controllers.API(registry);
const front = new API.httpStrategies.Express(controller, docs);

const apiReqHandler = front.apiRequest.bind(front);

app.options('/api/*', (req, res) => {
  res.send();
});

app.use('/api/users/', authenticationService());

app.get('/api', front.docsRequest.bind(front));

app.route(`/api/:type(${opts})`)
  .get(apiReqHandler).post(apiReqHandler).patch(apiReqHandler);

app.route(`/api/:type(${opts})/:id`)
  .get(apiReqHandler).patch(apiReqHandler).delete(apiReqHandler);

app.route(`/api/:type(${opts})/:id/relationships/:relationship`)
  .get(apiReqHandler).post(apiReqHandler).patch(apiReqHandler)
  .delete(apiReqHandler);

app.use((req, res, next) => {
  front.sendError(new API.types.Error(404, undefined, 'Not Found'), req, res);
  next();
});

export default app;
