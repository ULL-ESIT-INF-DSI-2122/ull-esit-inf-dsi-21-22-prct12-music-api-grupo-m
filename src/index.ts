import express = require('express');
import './database/mongoose';

import {artistRouter} from './routers/artistRouter';
import {songRouter} from './routers/songRouter';
import {playlistRouter} from './routers/playlistRouter';
import {defaultRouter} from './routers/defaultRouter';

/**
 * Tras la importacion de los diferentes routers se especifican los puntos de acceso a la aplicación.
 * Estos puntos de acceso son `song`, `artist` y `playlist` para realizar las operaciones CRUD en cada una.
 * `app.use(express.json());` permite parsear el cuerpo de una peticion por defecto como JSON.
 * @method use use es un método que permite utilizar los puntos de acceso a través de Express.
 */
const app = express();
app.use(express.json());
app.use(songRouter);
app.use(playlistRouter);
app.use(artistRouter);
app.use(defaultRouter);

/**
 * Se define el entorno y el puerto y se escuchan las peticiones
 * @method listen metodo que escucha las peticiones y despliega el servidor.
 */
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor desplegado en el puerto ${port}`);
});

