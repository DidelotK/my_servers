import mongoose from 'mongoose';
import BluebirdPromise from 'bluebird';
import APP_CONSTANTS from '../constants/appConstants';

mongoose.Promise = BluebirdPromise;
const Schema = mongoose.Schema;
const self = APP_CONSTANTS.SERVER_IP;

const userSchema = Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const model = mongoose.model('User', userSchema);

const user = {
  schema: userSchema,
  model,
  registry: {
    urlTemplates: {
      self: `${self}/api/users/{id}`,
      relationship: `${self}/api/users/{ownerId}/relationships/{path}`,
    },
  },
  actions: {
    login(email, password, token) {
      return model.findOneAndUpdate({ email, password },
        { token }).exec();
    },
    getUserByToken(token) {
      return model.findOne({ token }).exec();
    },
  },
};

export default user;
