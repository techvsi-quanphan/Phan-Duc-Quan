import logger from 'jet-logger';

/**
 * Wait for a certain number of milliseconds.
 */
export function tick(milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, milliseconds);
  });
}

/**
 * Try parse the body (basically function to validate)
 * @param req request body
 * @returns body
 */
export function tryParse(req: any): Promise<any>{
  try {
    logger.info('Trying to Parse request body: '
    + JSON.stringify(req.body));
    if(!req.body.name || !req.body.version || !req.body.description){
      throw "Invalid Body - Missing fields";
    }
    return req.body;
  } catch (error) {
    logger.err(`Error tryParse: ${error}`);
    throw error
  }
}
