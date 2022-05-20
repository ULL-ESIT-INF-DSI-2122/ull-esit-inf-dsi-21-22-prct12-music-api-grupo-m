import {connect} from 'mongoose';

/**
 * Se pretende realizar la conexión con el servidor de MongoDB a través de mongoose.
 * Si se establece correctamente la conexion muestra un mensaje de conexión establecida
 * en caso negativo muestra el error correspondiente
 * @method connect permite establecer la conexion a una URL especificada.
 */
const mongoDBUrl = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/iSOunD';

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
