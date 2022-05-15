
import express = require('express');
import './database/mongoose';

import {artistRouter} from './routers/artistRouter';
// import {songRouter} from './routers/songRouter';
// import {playlistRouter} from './router/playlistRouter';

const app = express();
app.use(express.json());
app.use(artistRouter);
// app.use(songRouter);
// app.use(playlistRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor desplegado en ${port}`);
});

