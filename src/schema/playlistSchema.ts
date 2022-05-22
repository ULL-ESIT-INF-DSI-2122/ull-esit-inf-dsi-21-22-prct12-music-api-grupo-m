import {Document, model} from 'mongoose';
import {Schema} from 'mongoose';
import {songSchema} from '../schema/songSchema';
import {Playlist} from '../models/playlist';

/**
 * Define como es el esquema de un objeto PLaylist (playlistSchema) que se guardará en el sistema a través de **Mongoose**.
 * @method mongoose.Schema() es un método que crea un esquema con un array de objetos que se guardarán en ese esquema.
 * @param name nombre de la playlist, comprobamos que empieze por mayuscula y solo contenga letras o numeros.
 * @param songs lista de canciones que se incorporarán a la playlist.
 * @param genres generos de la cancion que deben estar recogidos entre algunos de los generos definidos en la propiedad `enum`.
 * Hay que resaltar que todos estos atributos son obligatorios al crear un objeto de tipo playlist, sin embergo hay un atributo que no es obligatorio
 * @param duration  es un atributo que se puede optar por especificar o no puesto que se calcula automaticamente al sumar la duracion de todas las canciones de la playlist.
 */
export const playlistSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    validate: (value: string) => {
      if (!value.match(/^[A-ZñÑ][a-zA-ZñÑ\s]*$/)) {
        throw new Error('El nombre de los artistas tiene que empezar con una mayúscula y solo pueden estar formados por letras.');
      }
    },
  },
  songList: {
    type: [Schema.Types.ObjectId],
    required: true,
    trim: true,
    ref: 'song',
  },

  duration: {
    type: Number,
    required: false,
    trim: true,
  },
});
/**
 * Se crea y se exporta un modelo playlist que posteriormente se operará con este, todo a través del metodo model de Mongoose.
 * @method mongoose.model<T>() metodo que permite crear un modelo basado en una clase y que almacena el esquema.
 */
export const playlistModel = model<Playlist>('playlist', playlistSchema);