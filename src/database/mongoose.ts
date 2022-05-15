import {connect} from 'mongoose';

const mongoDBUrl = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/SpotifyChino';

connect(mongoDBUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
}).then(() => {
  console.log('Conexión al servidor de MongoDB establecida');
}).catch(() => {
  console.log('No ha sido posible conectarse al servidor de MongoDB');
});
