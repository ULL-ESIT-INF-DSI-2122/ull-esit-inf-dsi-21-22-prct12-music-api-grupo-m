import * as express from 'express';
import {artistModel} from '../schema/artistSchema';

export const artistRouter = express.Router();


artistRouter.get('/artist', async (req, res) => {
  const filter = req.query.name?{name: req.query.name.toString()}:{};
  try {
    const resultSearch = await artistModel.find(filter);
    if (resultSearch.length !== 0) {
      return res.send(resultSearch);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send();
  }
});


artistRouter.get('/artist/:id', async (req, res) => {
  try {
    const artistFindById = await artistModel.findById(req.params.id);
    if (!artistFindById) {
      return res.status(404).send();
    }
    return res.send(artistFindById);
  } catch (error) {
    return res.status(500).send();
  }
});

artistRouter.post('/artist', async (req, res) => {
  const artista = new artistModel(req.body);
  try {
    await artista.save();
    res.status(201).send(artista);
  } catch (error) {
    res.status(400).send(error);
  }
});
