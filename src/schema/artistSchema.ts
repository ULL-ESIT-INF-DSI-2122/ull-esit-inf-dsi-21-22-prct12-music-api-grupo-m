import * as mongoose from 'mongoose';
import {Artist} from '../models/artist';
import {songSchema} from '../schema/songSchema';


export const artistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: (value: string) => {
      if (!value.match(/^[A-ZñÑ][a-zA-ZñÑ ]*$/)) {
        throw new Error('El nombre de los artistas tiene que empezar con una mayúscula y solo pueden estar formados por letras.');
      }
    },
  },
  genres: {
    type: [String],
    required: true,
    trim: true,
    enum: ['CLASICA', 'ROCK', 'HIP-HOP', 'REGGEATON', 'POP', 'TRAP', 'PUNK', 'K-POP', 'METAL', 'CUMBIA', 'BLUES',
      'JAZZ', 'COUNTRY', 'EDM', 'FLAMENCO', 'SALSA', 'REGGAE', 'GOSPEL', 'DISCO', 'BANDA SONORA', 'ALTERNATIVO', 'ELECTROPOP', 'SOUL', 'R&B', 'RAP', 'INDIE'],
  },

  songList: {
    type: [songSchema],
    required: true,
    trim: true
  }, 

  listenerMensual: {
    type: Number,
    required: false,
    trim: true
  },
});

export const artistModel = mongoose.model<Artist>('artist', artistSchema);