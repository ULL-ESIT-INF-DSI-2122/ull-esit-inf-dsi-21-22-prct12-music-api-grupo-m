import * as express from 'express';
import {songModel} from '../schema/songSchema';

/**
 * Definimos un nuevo punto de acceso para los objetos Cancion (/song).
 * @method express.Router() método que permite definir un nuevo router, en este caso para operar con Canciones.
 */
export const songRouter = express.Router();


/**
 * En este punto especificamos las operaciones de obtencion de datos desde la base de datos (GET).
 * @method get con el metodo get especificamos las operaciones de obtencion desde la base de datos.
 */

/**
 * Por un lado se puede realizar la busqueda en la base de datos especificando en el punto de acceso de `/song` una cancion a tarvés de su nombre
 * Por ejemplo una ejecución sería tal que `localhost:3000/song?name=Nombre`.
 * a través de la query string (?) le pasamos el nombre de la petición que será el nombre de la cancion, se guarda en una variable `filter`.
 * Posteriormente se busca en un modelo songSchema el nombre que encaje con el filtro y en caso de exito se devuelve y en caso negativo se establece un error con estado 500.
 * @method find permite buscar en el sistema una ocurrencia que se le pasa como argumento.
 */
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


/**
 * Por otro lado se puede realizar una búsqueda en la base de datos a través del ID
 * especificamente  ahora funciona como `localhost:3000/song/ID` de esta forma se busca autimanticamente en la coleccion el parametro con ese id y se devuelve.
 * @method findById busca en una coleccion a través del ID del mismo.
 */
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

/**
 * En este punto se realiza la operación que añade una canción a la base de datos (POST).
 * se especifica la operación post en la ruta /song perteneciente al router de canción.
 * de forma resumida se recoge los valores del cuerpo de la petición y se crea un nuevo modelo con estos atributos y se guarda con `save` en la base de datos.
 * @method save permite guardar un elemento en la colección de canciones.
 */

songRouter.post('/song', async (req, res) => {
  console.log(req.body.author);
  const song = new songModel(req.body);
  try {
    await song.save();
    res.status(201).send(song);
  } catch (error) {
    res.status(400).send(error);
  }
});

/**
 * Aqui se define las peticiones del router de canciones para modificar los valores de una cancion.
 * se le pasa un nuevo cuerpo se comprueba que sean modificaciones permitidas y se modifica a traves de findoneandupdate
 * @method findOneAndUpdate busca el nombre de una canción pasada por la query string (?) y en caso de encontrarla se le pasa el nuevo cuerpo.
 */

songRouter.patch('/song', async (req, res) => {
  console.log(`Cancion que se quiere modificar: ${req.body.name}`);
  if (!req.body.name) {
    return res.status(400).send({
      error: 'El nombre de una cancion debe de ser especificado',
    });
  }
  const allowedUpdates = ['name', 'author', 'duration', 'genres', 'single', 'reproduction', 'listener'];
  const actualUpdates = Object.keys(req.body);
  const isValidUpdate = actualUpdates.every((update) => allowedUpdates.includes(update));

  if (!isValidUpdate) {
    return res.status(400).send({
      error: 'No se puede modificar',
    });
  }

  try {
    const songModify = await songModel.findOneAndUpdate({name: req.body.name.toString()}, req.body, {
      new: true,
      runValidators: true,
    });

    if (!songModify) {
      return res.status(404).send();
    }

    return res.send(songModify);
  } catch (error) {
    return res.status(400).send(error);
  }
});

/**
 * Funcion igual que el metodo anterior pero en vez de pasarle el name a través de una query string se pasa el id de la cancion y se modifica.
 * @method findByIdAndUpdate busca por id la cancion a modificar y se le pasa el nuevo cuerpo que será el que se sustituira.
 */
songRouter.patch('/song/:id', async (req, res) => {
  const allowedUpdates = ['name', 'author', 'duration', 'genres', 'single', 'reproduction', 'listener'];
  const actualUpdates = Object.keys(req.body);
  const isValidUpdate = actualUpdates.every((update) => allowedUpdates.includes(update));

  if (!isValidUpdate) {
    return res.status(400).send({
      error: 'No se puede modificar',
    });
  }

  try {
    const songModify = await songModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!songModify) {
      return res.status(404).send();
    }
    return res.send(songModify);
  } catch (error) {
    return res.status(400).send(error);
  }
});


/**
 * Se especifica las operaciones de eliminacion de un objeto canción a partir de la query string
 * se busca el nombre de la cancion en caso de encontrar una ocurrencia de este tipo se elimina con findOneAndDelete.
 * @method findOneAndDelete elimina la cancion que coincida con el nombre que se le pase de la base de datos.
 */
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

/**
 * Funcion igual que el método anterior pero se realiza la busqueda a través del ID de la cancion en el sistema.
 * @method findByIdAndDelete elimina el objeto de la base de datos que coincida con el ID que se le pase.
 */
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