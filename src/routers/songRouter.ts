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

songRouter.post('/song', async (req, res) => {
  const song = new songModel(req.body);
  try {
    await song.save();
    res.status(201).send(song);
  } catch (error) {
    res.status(400).send(error);
  }
});