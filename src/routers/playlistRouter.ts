import * as express from 'express';
import {playlistModel} from '../schema/playlistSchema';

/**
 * Definimos un nuevo punto de acceso para los objetos de tipo playlist (/playlist).
 * @method express.Router() método que permite definir un nuevo router, en este caso para operar con Playlists.
 */
export const playlistRouter = express.Router();

/**
 * En este punto especificamos las operaciones de obtencion de datos desde la base de datos (GET).
 * @method get con el metodo get especificamos las operaciones de obtencion desde la base de datos.
 */

/**
 * Por un lado se puede realizar la busqueda en la base de datos especificando en el punto de acceso de `/playlist` una playlist a través de su nombre
 * Por ejemplo una ejecución sería tal que `localhost:3000/playlist?name=Nombre`.
 * a través de la query string (?) le pasamos el nombre de la petición que será el nombre de la playlist, se guarda en una variable `filter`.
 * Posteriormente se busca en un modelo playlistSchema con el nombre que encaje con el filtro y en caso de exito se devuelve y en caso negativo se establece un error con estado 500.
 * @method find permite buscar en el sistema una ocurrencia que se le pasa como argumento.
 */

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

/**
 * Por otro lado se puede realizar una búsqueda en la base de datos a través del ID
 * especificamente  ahora funciona como `localhost:3000/playlist/ID` de esta forma se busca automanticamente en la coleccion el parametro con ese id y se devuelve.
 * @method findById busca en una coleccion a través del ID del mismo.
 */

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

/**
 * En este punto se realiza la operación que añade o crea una playlist a la base de datos (POST).
 * se especifica la operación post en la ruta /playlist perteneciente al router de las playlists.
 * de forma resumida se recoge los valores del cuerpo de la petición y se crea un nuevo modelo con estos atributos y se guarda con `save` en la base de datos.
 * @method save permite guardar un elemento en la colección de playlist.
 */
playlistRouter.post('/playlist', async (req, res) => {
  const canciones = req.body.songs;
  let sumaDuration: number = 0;
  for (let i in canciones) {
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


/**
 * Aqui se define las peticiones del router de playlist para modificar los valores de una playlist.
 * se le pasa un nuevo cuerpo se comprueba que sean modificaciones permitidas y se modifica a traves de findoneandupdate
 * @method findOneAndUpdate busca el nombre de una canción pasada por la query string (?) y en caso de encontrarla se le pasa el nuevo cuerpo.
 */


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

/**
 * Funcion igual que el metodo anterior pero en vez de pasarle el name a través de una query string se pasa el id de la playlist y se modifica.
 * @method findByIdAndUpdate busca por ID de la playlist a modificar y se le pasa el nuevo cuerpo que será el que se sustituira.
 */

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

/**
 * Se especifica las operaciones de eliminacion de un objeto playlist a partir de la query string
 * se busca el nombre de la playlist y en caso de encontrar una ocurrencia de este tipo se elimina con findOneAndDelete.
 * @method findOneAndDelete elimina la playlist que coincida con el nombre que se le pase de la base de datos.
 */

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

/**
 * Funcion igual que el método anterior pero se realiza la busqueda a través del ID de la playlist en el sistema.
 * @method findByIdAndDelete elimina el objeto de la base de datos que coincida con el ID que se le pase.
 */

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
