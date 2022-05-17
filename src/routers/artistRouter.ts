import * as express from 'express';
import {artistModel} from '../schema/artistSchema';

export const artistRouter = express.Router();

// Para buscarun artista desde la base de datos

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

// Para crear y añadir un artista a la base de datos

artistRouter.post('/artist', async (req, res) => {
  const artista = new artistModel(req.body);
  try {
    await artista.save();
    res.status(201).send(artista);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Para modificar informacion de un artista

artistRouter.patch('/artist', async (req, res) => {
  console.log(`Artista que se quiere modificar: ${req.body.name}`);
  if (!req.body.name) {
    return res.status(400).send({
      error: 'Un artista debe de ser especificado',
    });
  }
  const allowedUpdates = ['name', 'genres'];
  const actualUpdates = Object.keys(req.body);
  const isValidUpdate = actualUpdates.every((update) => allowedUpdates.includes(update));

  if (!isValidUpdate) {
    return res.status(400).send({
      error: 'No se puede modificar',
    });
  }

  try {
    const artistModify = await artistModel.findOneAndUpdate({name: req.body.name.toString()}, req.body, {
      new: true,
      runValidators: true,
    });

    if (!artistModify) {
      return res.status(404).send();
    }

    return res.send(artistModify);
  } catch (error) {
    return res.status(400).send(error);
  }
});


artistRouter.patch('/artist/:id', async (req, res) => {
  const allowedUpdates = ['name', 'genres'];
  const actualUpdates = Object.keys(req.body);
  const isValidUpdate = actualUpdates.every((update) => allowedUpdates.includes(update));

  if (!isValidUpdate) {
    return res.status(400).send({
      error: 'No se puede modificar',
    });
  }

  try {
    const artistModify = await artistModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!artistModify) {
      return res.status(404).send();
    }

    return res.send(artistModify);
  } catch (error) {
    return res.status(400).send(error);
  }
});
