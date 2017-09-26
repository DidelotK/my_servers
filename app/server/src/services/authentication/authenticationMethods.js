import jwt from 'jsonwebtoken';
import uuid from 'uuid';
import BluebirdPromise from 'bluebird';
import dbUsers from '../../models/users';
import APP_CONSTANTS from '../../constants/appConstants';

const verify = BluebirdPromise.promisify(jwt.verify);

const authenticate = (req, res) => {
  const token = jwt.sign({ token: uuid.v4() }, APP_CONSTANTS.TOKEN_SECRET,
    { expiresIn: APP_CONSTANTS.TOKEN_EXPIRES });
  dbUsers.actions.login(req.body.username, req.body.password, token)
    .then((doc) => {
      if (doc) {
        res.status(200).send({
          account_id: doc.id,
          access_token: token,
        });
      } else {
        res.status(400).send({ error: 'wrong_credentials' });
      }
    }).catch(err => res.status(400).send({ error: err }));
};

const isAuthenticated = (req, res, next) => {
  verify(req.body.token, APP_CONSTANTS.TOKEN_SECRET)
    .then(() => dbUsers.actions.getUserByToken(req.body.token))
    .then((doc) => {
      req.user = doc;
      next();
    })
    .catch((err) => {
      res.status(401).send({ error: err });
    });
};

export { authenticate, isAuthenticated };
