import * as mongoose from 'mongoose';
import {Song} from '../models/song';

/**
 * Define como es el esquema de un objeto Canción (songSchema) que se guardará en el sistema a través de **Mongoose**.
 * @method mongoose.Schema() es un método que crea un esquema con un array de objetos que se guardarán en ese esquema.
 * @param name nombre de la canción a travéss de validadores se comprueba que empieze por mayuscula y solo contenga letras.
 * @param author autor o autores de una cancion.
 * @param duration duracion en minutos de la cancion.
 * @param genres generos de la cancion que deben estar recogidos entre algunos de los generos definidos.
 * @param single flag que comprueba si la cancion fue un single o no.
 * @param reproduction numero de reproducciones que ha tenido la cancion.
 * @param listener numero de oyentes mensuales que tiene la canción.
 * Hay que resaltar que todos estos atributos son obligatorios al crear un objeto.
 */
export const songSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    validate: (value: string) => {
      if (!value.match(/^[A-Za-z0-9]\s*$/)) {
        throw new Error('El nombre de la cancion tiene que empezar con una mayúscula y solo pueden estar formados por letras o numeros.');
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

/**
 * Se crea y se exporta un modelo canción que posteriormente se operará con este, todo a través del metodo model de Mongoose.
 * @method mongoose.model<T>() metodo que permite crear un modelo basado en una clase y que almacena el esquema.
 */
export const songModel = mongoose.model<Song>('song', songSchema);