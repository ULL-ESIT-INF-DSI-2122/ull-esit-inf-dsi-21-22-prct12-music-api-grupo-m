import * as mongoose from 'mongoose';
import {Artist} from '../models/artist';
import {songSchema} from '../schema/songSchema';

/**
 * Define como es el esquema de un objeto Artista (artistSchema) que se guardará en el sistema a través de **Mongoose**.
 * @method mongoose.Schema() es un método que crea un esquema con un array de objetos que se guardarán en ese esquema.
 * @param name nombre del artista, comprobamos que empieze por mayuscula y solo contenga letras y no se puede repetir.
 * @param genres generos de la cancion que deben estar recogidos entre algunos de los generos definidos en la propiedad `enum`.
 * @param songList lista de canciones que ha publicado el artista en el sistema
 * Hay que resaltar que todos estos atributos son obligatorios al crear un objeto de tipo artista, sin embergo hay un atributo que no es obligatorio
 * @param listenerMensual Listener mensual es un atributo que se puede optar por especificar o no puesto que se calcula automaticamente al sumar todos los oyentes de las canciones.
 */
export const artistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: (value: string) => {
      if (!value.match(/^[A-ZñÑ][a-zA-ZñÑ ]\s*$/)) {
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
    trim: true,
  },

  listenerMensual: {
    type: Number,
    required: false,
    trim: true,
  },
});
/**
 * Se crea y se exporta un modelo artista que posteriormente se operará con este, todo a través del metodo model de Mongoose.
 * @method mongoose.model<T>() metodo que permite crear un modelo basado en una clase y que almacena el esquema.
 */
export const artistModel = mongoose.model<Artist>('artist', artistSchema);