import * as express from 'express';
import {artistModel} from '../schema/artistSchema';

export const artistRouter = express.Router();

artistRouter.post('/artist', async (req, res) => {
  const artista = new artistModel(req.body);
  try {
    await artista.save();
    res.status(201).send(artista);
  } catch (error) {
    res.status(400).send(error);
  }
});
