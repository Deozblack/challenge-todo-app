import { setGlobalOptions } from 'firebase-functions';
import { onRequest } from 'firebase-functions/v2/https';
import * as logger from 'firebase-functions/logger';
import { app } from '../../src/app.js';

setGlobalOptions({
  maxInstances: 10,
  region: 'us-central1',
});

export const api = onRequest(
  {
    cors: true,
    memory: '256MiB',
    timeoutSeconds: 60,
  },
  (request, response) => {
    logger.info('API request received', {
      method: request.method,
      path: request.path,
    });
    return app(request, response);
  }
);
