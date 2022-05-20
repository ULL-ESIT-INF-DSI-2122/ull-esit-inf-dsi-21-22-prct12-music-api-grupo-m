import * as express from 'express';
import {artistModel} from '../schema/artistSchema';

/**
 * Definimos un nuevo punto de acceso para los objetos de tipo Artista (/artist).
 * @method express.Router() método que permite definir un nuevo router, en este caso para operar con Artistas.
 */
export const artistRouter = express.Router();

/**
 * En este punto especificamos las operaciones de obtencion de datos desde la base de datos (GET).
 * @method get con el metodo get especificamos las operaciones de obtencion desde la base de datos.
 */

/**
 * Por un lado se puede realizar la busqueda en la base de datos especificando en el punto de acceso de `/artist` un cantante a través de su nombre
 * Por ejemplo una ejecución sería tal que `localhost:3000/artist?name=Nombre`.
 * a través de la query string (?) le pasamos el nombre de la petición que será el nombre del artista, se guarda en una variable `filter`.
 * Posteriormente se busca en un modelo artistSchema con el nombre que encaje con el filtro y en caso de exito se devuelve y en caso negativo se establece un error con estado 500.
 * @method find permite buscar en el sistema una ocurrencia que se le pasa como argumento.
 */

artistRouter.get('/artist', async (req, res) => {
  const filter = req.query.name?{name: req.query.name.toString()}:{};
  try {
    const resultSearch = await artistModel.find(filter);
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
 * especificamente  ahora funciona como `localhost:3000/artist/ID` de esta forma se busca automanticamente en la coleccion el parametro con ese id y se devuelve.
 * @method findById busca en una coleccion a través del ID del mismo.
 */

artistRouter.get('/artist/:id', async (req, res) => {
  try {
    const artistFindById = await artistModel.findById(req.params.id);
    if (!artistFindById) {
      return res.status(404).send();
    }
    return res.send(artistFindById);
  } catch (error) {
    return res.status(500).send();
  }
});

/**
 * En este punto se realiza la operación que añade un aritsta a la base de datos (POST).
 * se especifica la operación post en la ruta /artist perteneciente al router de los cantantes.
 * de forma resumida se recoge los valores del cuerpo de la petición y se crea un nuevo modelo con estos atributos y se guarda con `save` en la base de datos.
 * @method save permite guardar un elemento en la colección de artistas.
 */

artistRouter.post('/artist', async (req, res) => {
  const canciones = req.body.songList;
  let sumaOyentes: number = 0;
  for (let i in canciones) {
    sumaOyentes += canciones[i].listener;
  }
  req.body.listenerMensual = sumaOyentes;
  const artista = new artistModel(req.body);
  try {
    await artista.save();
    res.status(201).send(artista);
  } catch (error) {
    res.status(400).send(error);
  }
});

/**
 * Aqui se define las peticiones del router de artista para modificar los valores de un musico.
 * se le pasa un nuevo cuerpo se comprueba que sean modificaciones permitidas y se modifica a traves de findoneandupdate
 * @method findOneAndUpdate busca el nombre de una canción pasada por la query string (?) y en caso de encontrarla se le pasa el nuevo cuerpo.
 */


artistRouter.patch('/artist', async (req, res) => {
  console.log(`Artista que se quiere modificar: ${req.body.name}`);
  if (!req.body.name) {
    return res.status(400).send({
      error: 'Un artista debe de ser especificado',
    });
  }
  const allowedUpdates = ['name', 'genres', 'songList'];
  const actualUpdates = Object.keys(req.body);
  const isValidUpdate = actualUpdates.every((update) => allowedUpdates.includes(update));

  if (!isValidUpdate) {
    return res.status(400).send({
      error: 'No se puede modificar',
    });
  }

  try {
    const artistModify = await artistModel.findOneAndUpdate({name: req.body.name.toString()}, req.body, {
      new: true,
      runValidators: true,
    });

    if (!artistModify) {
      return res.status(404).send();
    }

    return res.send(artistModify);
  } catch (error) {
    return res.status(400).send(error);
  }
});

/**
 * Funcion igual que el metodo anterior pero en vez de pasarle el name a través de una query string se pasa el id del artista y se modifica.
 * @method findByIdAndUpdate busca por id el musico a modificar y se le pasa el nuevo cuerpo que será el que se sustituira.
 */

artistRouter.patch('/artist/:id', async (req, res) => {
  const allowedUpdates = ['name', 'genres', 'songList'];
  const actualUpdates = Object.keys(req.body);
  const isValidUpdate = actualUpdates.every((update) => allowedUpdates.includes(update));

  if (!isValidUpdate) {
    return res.status(400).send({
      error: 'No se puede modificar',
    });
  }

  try {
    const artistModify = await artistModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!artistModify) {
      return res.status(404).send();
    }

    return res.send(artistModify);
  } catch (error) {
    return res.status(400).send(error);
  }
});

/**
 * Se especifica las operaciones de eliminacion de un objeto artista a partir de la query string
 * se busca el nombre del artista en caso de encontrar una ocurrencia de este tipo se elimina con findOneAndDelete.
 * @method findOneAndDelete elimina el muscio que coincida con el nombre que se le pase de la base de datos.
 */
artistRouter.delete('/artist', async (req, res) => {
  console.log(`Se va a eliminar el artista: ${req.query.name}`);
  if (!req.query.name) {
    return res.status(400).send({
      error: 'Se debe introducir el nombre de un artista',
    });
  }

  try {
    const artistDeleted = await artistModel.findOneAndDelete({name: req.query.name.toString()});
    if (!artistDeleted) {
      return res.status(404).send();
    }
    return res.send(artistDeleted);
  } catch (error) {
    return res.status(400).send();
  }
});

/**
 * Funcion igual que el método anterior pero se realiza la busqueda a través del ID del artista en el sistema.
 * @method findByIdAndDelete elimina el objeto de la base de datos que coincida con el ID que se le pase.
 */
artistRouter.delete('/artist/:id', async (req, res) => {
  try {
    const artistDeleted = await artistModel.findByIdAndDelete(req.params.id);

    if (!artistDeleted) {
      return res.status(404).send();
    }

    return res.send(artistDeleted);
  } catch (error) {
    return res.status(400).send();
  }
});