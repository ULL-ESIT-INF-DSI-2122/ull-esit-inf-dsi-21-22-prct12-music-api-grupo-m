import * as mongoose from 'mongoose';
import {songSchema} from '../schema/songSchema';
import {Playlist} from '../models/playlist';


export const playlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    validate: (value: string) => {
      if (!value.match(/^[A-Za-z0-9]*$/)) {
        throw new Error('El nombre de la cancion tiene que empezar con una mayúscula y solo pueden estar formados por letras.');
      }
    },
  },
  songs: {
    type: [songSchema],
        unique: true,
    required: true,
    trim: true,
  },
  duration: {
    type: Number,
    required: false,
  },
  genres: {
    type: [String],
    required: true,
    trim: true,
    enum: ['CLASICA', 'ROCK', 'HIP-HOP', 'REGGEATON', 'POP', 'TRAP', 'PUNK', 'K-POP', 'METAL', 'CUMBIA', 'BLUES',
      'JAZZ', 'COUNTRY', 'EDM', 'FLAMENCO', 'SALSA', 'REGGAE', 'GOSPEL', 'DISCO', 'BANDA SONORA', 'ALTERNATIVO', 'ELECTROPOP', 'SOUL', 'R&B', 'RAP', 'INDIE'],
  },
});


export const playlistModel = mongoose.model<Playlist>('playlist', playlistSchema);
