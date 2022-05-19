import * as mongoose from 'mongoose';
// import {artistSchema} from '../schema/artistSchema';
import {Song} from '../models/song';


export const songSchema = new mongoose.Schema({
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
  author: {
    type: [String],
    unique: true,
    required: true,
    trim: true,
  },
  duration: {
    type: Number,
    required: true,
    trim: true,
  },
  genres: {
    type: [String],
    required: true,
    trim: true,
    enum: ['CLASICA', 'ROCK', 'HIP-HOP', 'REGGEATON', 'POP', 'TRAP', 'PUNK', 'K-POP', 'METAL', 'CUMBIA', 'BLUES',
      'JAZZ', 'COUNTRY', 'EDM', 'FLAMENCO', 'SALSA', 'REGGAE', 'GOSPEL', 'DISCO', 'BANDA SONORA', 'ALTERNATIVO', 'ELECTROPOP', 'SOUL', 'R&B', 'RAP', 'INDIE'],
  },
  single: {
    type: Boolean,
    required: true,
    trim: true,
  },
  reproduction: {
    type: Number,
    required: true,
    trim: true,
  },
  listener: {
    type: Number,
    required: true,
    trim: true,
  },
});


export const songModel = mongoose.model<Song>('song', songSchema);