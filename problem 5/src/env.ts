/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { getOsEnv, normalizePort } from "./env/index";
import * as pkg from '../package.json';

const env = {
  nodeEnv: getOsEnv('NODE_ENV'),
  // eslint-disable-next-line node/no-process-env
  logLevel: getOsEnv('APP_LOGLEVEL'),
  app: {
    name: getOsEnv('APP_NAME'),
    version: (pkg as any)?.version,
    description: (pkg as any)?.description,
    host: getOsEnv('APP_HOST'),
    schema: getOsEnv('APP_SCHEMA'),
    routePrefix: getOsEnv('APP_ROUTE_PREFIX'),
    port: normalizePort(getOsEnv('APP_PORT')),
  }
}; 

export default env;