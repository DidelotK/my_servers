import dotenv from 'dotenv';
import winston from 'winston-color';
import app from './express-server';

dotenv.config();
winston.level = process.env.LOG_LEVEL;

const server = app.listen(process.env.SERVER_PORT, () => {
  const host = server.address().address;
  const port = server.address().port;

  winston.info(`Example app listening at http://${host}:${port}`);
});
