import * as express from 'express';
import {songModel} from '../schema/songSchema';

export const songRouter = express.Router();

songRouter.get('/song', async (req, res) => {
  const filter = req.query.name?{name: req.query.name.toString()}:{};
  try {
    const songs = await songModel.find(filter);
    if (songs.length !== 0) {
      return res.send(songs);
    }
    return res.status(404).send();
  } catch (error) {
    return res.status(500).send();
  }
});


songRouter.get('/song/:id', async (req, res) => {
  try {
    const songFindById = await songModel.findById(req.params.id);
    if (!songFindById) {
      return res.status(404).send();
    }
    return res.send(songFindById);
  } catch (error) {
    return res.status(500).send();
  }
});


// No se que hacer con el calulo de los oyentes
songRouter.post('/song', async (req, res) => {
  console.log(req.body.author);
  const song = new songModel(req.body);
  // Recorremos el artista o los artistas que se le ha pasado.
  // Indexamos la cancion creada en el array de canciones del artista.
  // realizamos el calculo de oyentes mensuales del artista.
  try {
    await song.save();
    res.status(201).send(song);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Eliminar artistas
songRouter.delete('/song', async (req, res) => {
  console.log(`Se va a eliminar la canción: ${req.query.name}`);
  if (!req.query.name) {
    return res.status(400).send({
      error: 'Se debe introducir el nombre de una cancion',
    });
  }

  try {
    const songDeleted = await songModel.findOneAndDelete({name: req.query.name.toString()});
    if (!songDeleted) {
      return res.status(404).send();
    }
    return res.send(songDeleted);
  } catch (error) {
    return res.status(400).send();
  }
});

songRouter.delete('/song/:id', async (req, res) => {
  try {
    const songDeleted = await songModel.findByIdAndDelete(req.params.id);

    if (!songDeleted) {
      return res.status(404).send();
    }

    return res.send(songDeleted);
  } catch (error) {
    return res.status(400).send();
  }
});