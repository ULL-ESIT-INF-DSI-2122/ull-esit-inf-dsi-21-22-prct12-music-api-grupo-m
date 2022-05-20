import * as express from 'express';

/**
 * Define un router denominado defaultRouter.
 * En caso de acceder a un punto de acceso no definido, es edicr que no sean,  `/song, /artist o /playlist` manda error con estado 501.
 */
export const defaultRouter = express.Router();

defaultRouter.all('*', (_, res) => {
  res.status(501).send();
});
