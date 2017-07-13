import express from 'express';
import bodyParser from 'body-parser';
import { authenticate, isAuthenticated } from './authenticationMethods';

const router = express.Router();
const parseUrl = bodyParser.urlencoded({ extended: true });

const authenticationServices = () => {
  router.post('/login', parseUrl, authenticate);

  router.post('/logout', parseUrl, isAuthenticated, (req, res) => {
    req.user.token = undefined;
    req.user.save();
    res.status(200).end();
  });

  return router;
};

export default authenticationServices;
