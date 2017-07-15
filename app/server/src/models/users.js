import mongoose from 'mongoose';
import dotenv from 'dotenv';
import BluebirdPromise from 'bluebird';

dotenv.config();
mongoose.Promise = BluebirdPromise;
const Schema = mongoose.Schema;
const self = process.env.SERVER_IP;

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
