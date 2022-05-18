
import express = require('express');
import './database/mongoose';

import {artistRouter} from './routers/artistRouter';
import {songRouter} from './routers/songRouter';
import {playlistRouter} from './routers/playlistRouter';
import {defaultRouter} from './routers/defaultRouter';

const app = express();
app.use(express.json());
app.use(artistRouter);
app.use(songRouter);
app.use(playlistRouter);
app.use(defaultRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor desplegado en el puerto ${port}`);
});

