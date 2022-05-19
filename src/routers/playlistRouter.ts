import * as express from 'express';
import {playlistModel} from '../schema/playlistSchema';

export const playlistRouter = express.Router();

// Para consultar Playlists

playlistRouter.get('/playlist', async (req, res) => {
  const filter = req.query.name?{name: req.query.name.toString()}:{};
  try {
    const resultSearch = await playlistModel.find(filter);
    if (resultSearch.length !== 0) {
      return res.send(resultSearch);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send();
  }
});


playlistRouter.get('/playlist/:id', async (req, res) => {
  try {
    const playlistFindById = await playlistModel.findById(req.params.id);
    if (!playlistFindById) {
      return res.status(404).send();
    }
    return res.send(playlistFindById);
  } catch (error) {
    return res.status(500).send();
  }
});


// Para crear Playlists

playlistRouter.post('/playlist', async (req, res) => {
  const canciones = req.body.songs;
  let sumaDuration: number = 0;
  for (var i in canciones) {
    sumaDuration += canciones[i].duration;
  }
  req.body.duration = sumaDuration;

  const playlist = new playlistModel(req.body);
  try {
    await playlist.save();
    res.status(201).send(playlist);
  } catch (error) {
    res.status(400).send(error);
  }
});


// Para modificar Playlists

playlistRouter.patch('/playlist', async (req, res) => {
  console.log(`Playlist que se quiere modificar: ${req.body.name}`);
  if (!req.body.name) {
    return res.status(400).send({
      error: 'Una playlist debe de ser especificada',
    });
  }

  const allowedUpdates = ['name', 'songs', 'duration', 'genres'];
  const actualUpdates = Object.keys(req.body);
  const isValidUpdate = actualUpdates.every((update) => allowedUpdates.includes(update));


  if (!isValidUpdate) {
    return res.status(400).send({
      error: 'No se puede modificar',
    });
  }

  try {
    const playlistModify = await playlistModel.findOneAndUpdate({name: req.body.name.toString()}, req.body, {
      new: true,
      runValidators: true,
    });
    console.log(playlistModify);

    if (!playlistModify) {
      return res.status(404).send();
    }

    return res.send(playlistModify);
  } catch (error) {
    return res.status(400).send(error);
  }
});


playlistRouter.patch('/playlist/:id', async (req, res) => {
  const allowedUpdates = ['name', 'songs', 'duration', 'genres'];
  const actualUpdates = Object.keys(req.body);
  const isValidUpdate = actualUpdates.every((update) => allowedUpdates.includes(update));

  if (!isValidUpdate) {
    return res.status(400).send({
      error: 'No se puede modificar',
    });
  }

  try {
    const playlistModify = await playlistModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!playlistModify) {
      return res.status(404).send();
    }

    return res.send(playlistModify);
  } catch (error) {
    return res.status(400).send(error);
  }
});

// Para eliminar Playlists

playlistRouter.delete('/playlist', async (req, res) => {
  console.log(`Se va a eliminar la playlist: ${req.query.name}`);
  if (!req.query.name) {
    return res.status(400).send({
      error: 'Se debe introducir el nombre de una playlist existente',
    });
  }

  try {
    const playlistDeleted = await playlistModel.findOneAndDelete({name: req.query.name.toString()});
    if (!playlistDeleted) {
      return res.status(404).send();
    }
    return res.send(playlistDeleted);
  } catch (error) {
    return res.status(400).send();
  }
});

playlistRouter.delete('/playlist/:id', async (req, res) => {
  try {
    const playlistDeleted = await playlistModel.findByIdAndDelete(req.params.id);

    if (!playlistDeleted) {
      return res.status(404).send();
    }

    return res.send(playlistDeleted);
  } catch (error) {
    return res.status(400).send();
  }
});
