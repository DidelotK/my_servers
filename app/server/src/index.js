import winston from 'winston';
import app from './express-server';
import APP_CONSTANTS from './constants/appConstants';

winston.level = APP_CONSTANTS.LOG_LEVEL;

if (process.env.NODE_ENV === 'production') {
  winston.level = APP_CONSTANTS.LOG_LEVEL;
  winston.configure({
    transports: [
      new (winston.transports.File)({ filename: '/var/log/webapp/server.log' })
    ]
  });
}

const server = app.listen(APP_CONSTANTS.SERVER_PORT, () => {
  const host = server.address().address;
  const port = server.address().port;

  winston.info(`Example app listening at http://${host}:${port}`);
});
