# Práctica 12 -  API Node/Express de gestión de información musical
# Desarrollo de Sistemas Informáticos
# Universidad de la Laguna

***

### Autores:  
  * Joel Francisco Escobar Socas - alu0101130408@ull.edu.es
  * Micaela Lucia Mungay Juncal- alu0101124506@ull.edu.es

***

***

### Índice:

1. [Introducción y objetivos.](#id1)

2. [Desarrollo.](#id2)
      
  2.1. [Clase Artista.](#id21)

  2.2. [Clase Canción.](#id22)

  2.3. [Clase Playlist.](#id23)

  2.4. [Esquema Artista.](#id24)

  2.5. [Esquema Cancion.](#id25)

  2.6. [Esquema Playlist.](#id26)

  2.7. [Router por Defecto.](#id27)

  2.8. [Routers de Artistas, Canciones y Playlists.](#id28)

  2.9. [Fichero Mongoose.ts](#id29)

  2.10. [Fichero index.ts.](#id210)
    
3. [Instrucciones de Uso.](#id3)

4. [Dificultades.](#id4)

5. [Conclusión.](#id5)

6. [Referencias.](#id6)

***

<br/><br/>

## 1. Introducción y objetivos. <a name="id1"></a>

Introduccion

El objetivo de esta práctica grupal es implementar una API REST sobre un sistema que permite almacenar y manejar diversas colecciones de canciones, artistas y playlist. Para ello, se utilizarán para las operaciones CRUD(Create, Read, Update y Delete) que proporciona Node/Express y almacenar toda esta información en una base de datos implementada a través de MongoDB y Mongoose.

Para la ejecución del código se recomienda la utilización de la herramienta de ThunderClient que permite mandar diversas peticiones a nuestra base de datos desplegada con Heroku y MongoDB Atlas. Aunque para mayor comodidad se exportará un fichero con una serie de operaciones básicas la cual se puede importar dentro de ThunderClient para su comprobación.

Como se ha mencionado se debera hacer uso de los diversos módulos que se han explicado estas semanas durante las sesiones teoricas a demás de utilizar como lenguaje de programación TypeScript, tal y como se ha hecho durante toda la asignatura . Los módulos utilizados en este proyecto han sido:

* **MongoDB**: Para realizar la implementación de una base de datos que permita operaciones CRUD en las colecciones de canciones, artistas y Playlist del sistema .
* **Heroku**: Para desplegar la Aplicación.
* **Mongoose**: Para modelar los objetos que vamos a almacenar en la base de datos desde Node.JS.
* **Validator**: Para manejar el formato que esperamos que contengan los datos que se introducen.
* **Express**: Para crear los diferentes puntos de acceso a nuestra aplicación y el envio de peticiones

Y como extensiones cabe mencionar:

* **MongoDB for VSC**: La extension que permite conectar nuestra API y visualizar los resultados en visual Studio Code
* **MongoDB Atlas**: Especifica la base de datos que se ha desplegado de forma local a la Nube. Asociando un clúster a la base de datos y una direcciones
* **Thunder Client**: Para realizar las diferentes peticiones sobre operaciones que se quieran realizar.

<br/><br/>

## 2. Desarrollo. <a name="id2"></a>

La estructura que se ha adoptado en la carpeta `src` de este proyecto es la siguiente:

* **database/** : Directorio dedicado al despliege de la base de datos y a la conexión de la misma a través de mongoose.
  * *mongoose.ts*: Fichero que se encarga de conectar la base de datos de MongoDB  a través del método connect de mongoose.

* **models/** : Directorio que especifica las diferentes clases que implementan los objetos que se utilizarán
  * *artist.ts*: fichero que especifica los atributos con los que cuenta un objeto *artista* en nuestro sistema.
  * *song.ts*: fichero que especifica los atributos con los que cuenta un objeto *canción* en nuestro sistema.
  * *playlist.ts*: fichero que especifica los atributos con los que cuenta un objeto *Playlist* en nuestro sistema.

* **routers/** : Directorio que define los diferentes puntos de acceso a nuestra aplicación con Node/Express.
  * *defaultRouter.ts*: Este fichero implementa el punto de acceso que controla el acceso a cualquier ruta que no se espere
  * *artistRouter.ts*: Este fichero implementa el punto de acceso `/artist` que realiza las operaciones sobre los artistas del sistema.
  * *songRouter.ts*: Este fichero implementa el punto de acceso `/song` que realiza las operaciones sobre las canciones del sistema.
  * *playlistRouter.ts*: Este fichero implementa el punto de acceso `/playlist` que realiza las operaciones sobre las playlist del sistema.


* **schema/** : Directorio que define los diversos esquemas con los que se modelarán los objetos a través de mongoose.
  * *artistSchema.ts*: Este fichero implementa tanto la estructura como los validadores que controlan los objetos de tipo artista que se van a almacenar.
  * *songSchema.ts*: Este fichero implementa tanto la estructura como los validadores que controlan los objetos de tipo cancion que se van a almacenar.
  * *playlistSchema.ts*:Este fichero implementa tanto la estructura como los validadores que controlan los objetos de tipo playlist que se van a almacenar.

* **index.ts**: Este es el fichero principal que ejecuta el sistema, principalmente se centra en especificar el puerto de conexión y las rutas de los diferentes puntos de acceso a la aplicación.

De forma resumida este es el contenido del directorio fuente de nuestra aplicación. Sin embargo, en los siguientes puntos vamos a explicar más en profundidad estos ficheros y su funcionalidad.

Antes de explicar estas clases nos gustaría comentar que como se nos pide que se almacenen y opere con canciones, artistas y playlist estas son las clases que hemos definido. Sin embargo, hemos tomado la desicion de redifinir estas mismas para que se adapte más a los solicitado en el [guion](https://ull-esit-inf-dsi-2122.github.io/prct12-music-api/).

### 2.1. Clase Artista. <a name="id21"></a>

Dentro de estos cambios comentados ahora la clase `artista` implementa a la clase `cancion`, es decir, hemos visto que es mejor que se implemente en un artista una lista con todas las canciones que ha publicado o lanzado esto se puede observar en el atributo **songList** del constructor. Antes se definia como atributo privado y a través de una funcion se iban añadiendo a esta lista las canciones una por una cosa que no era compatible con la prática puesto que se solicita que un artista tenga una lista de canciones y que ne base a esta lista se calculen los oyentes mensuales de un artista. 

El resto es lo mismo que lo que se ha podido observar en la práctica anterior. La clase `artist` se encarga de implementar lo que consideramos un artista o musico dentro de nuestro sistema, es decir, aquel autor de una canción o compositor que ha creado la canción. En el constructor de esta clase todos los atributos son privados y definimos el nombre del artista (name) que será un string, los generos en los que el artista está recogido (genres) que será un array de `genreInfo` que es un enum que define los diversos tipos de generos con los que contamos, luego se define la lista de canciones (songList) que es un array de objetos `Song` y por último los oyentes mensuales (listenerMensual) que se calculará automaticamente recorriendo cada oyente de las canciones, **listener** y sumando todos estos valores para posteriormente asignarlo a este atributo.

En cuanto a los métodos que se implementan se hace uso de los métodos `Getters y Setter` que son métodos encargados de obtener o establecer valores a estos atributos privados, por lo que implementamos estos métodos por cada atributo.


```TypeScript
export class Artist {

  constructor(private name: string, private genres: genreInfo[], private songList: Song[], private listenerMensual: number) {
    this.name = name;
    this.genres = genres;
    this.songList = songList;
    this.listenerMensual = listenerMensual;
  }

  getName(): string {
    return this.name;
  }

  getGenre(): genreInfo[] {
    return this.genres;
  }

  getSongList(): Song[] {
    return this.songList;
  }

  getOyentesMensual():number {
    return this.listenerMensual;
  }

  public getListeners(): number {
    return this.listenerMensual;
  }

  public calOyentes(): number {
    let result: number = 0;
    if (this.songList.length > 0) {
      this.songList.forEach((song) => {
        result += song.getListener();
      });
    }
    return result;
  }

  setName(newName: string): void {
    this.name = newName;
  }
}

```
Para realizar las pruebas unitarias desarrolladas en la metodologia TDD sobre la clase `artist`, se define una instancia de esta clase y se comprueban los métodos de acceso *Getters y Setters* por cada artista, que en este caso es uno, Billie Eillish.

```TypeScript
import 'mocha';
import {expect} from 'chai';
import {Artist} from '../src/models/artist';
import {Song} from '../src/models/song';

let song1 = new Song("Listen Before I Go", ['Billie Eillish'], 4.03, ['POP'], false, 82368601, 823680);
let song2 = new Song("Billie Bossa Nova", ['Billie Eillish'], 3.16, ['R&B'], false, 87082953, 870820);
let song3 = new Song("my future", ['Billie Eillish'], 3.30, ['R&B'], true, 306917025, 3069170);
let song4 = new Song("Oxytocin", ['Billie Eillish'], 3.30, ['POP'], false, 82436281, 824360);

let artist1 = new Artist("Billie Eillish", ['POP', 'ALTERNATIVO'], [song1, song2, song3, song4], 82368601);

describe('Tests de la clase Artista', ()=>{
  it('Test de instancia de los diferentes artistas', ()=> {
    expect(artist1).to.exist;
  });

  it('Test de Métodos del artista', ()=> {
    expect(artist1.getName()).to.be.eql('Billie Eillish');
    expect(artist1.getGenre()).to.be.eql(['POP', 'ALTERNATIVO']);
    expect(artist1.getSongList()).to.be.eql([song1, song2, song3, song4]);
    expect(artist1.getListeners()).to.eql(82368601);
  });
});
```
<br/><br/>

### 2.2. Clase Cancion. <a name="id22"></a>

La clase canción también ha sido modificada en comparación con la clase `Song` de la práctica grupal anterior. En especifico puesto que creaba redundancia en las definiciones se ha optado por establecer el atributo privado `author` como un array de string con el nombre de los autores de la canciones. No se ha podido poner un objeto de tipo `Artist` puesto que creaba una redundancia, es decir, artista necesita un objeto cancion y un objeto cancion necesita un objeto artista por lo que al declararlo saltaba un problema con que clase debería definirse previamente. Por lo que hemos optado por esta desición especificando author como un string con el nombre del artista. El resto de la clase funciona igual que en la práctica anterior.

previamente se define el objeto `genreInfo` que se exportará y será aquel que defina los diversos generos del sistema.

```TypeScript
export type genreInfo = 'CLASICA'| 'ROCK'| 'HIP-HOP' | 'REGGEATON' | 'POP' | 'TRAP' | 'PUNK' | 'K-POP' | 'METAL' | 'CUMBIA' | 'BLUES' | 'JAZZ'| 'COUNTRY' | 'EDM' | 'FLAMENCO' | 'SALSA' | 'REGGAE' | 'GOSPEL' | 'DISCO' | 'BANDA SONORA' | 'ALTERNATIVO' | 'ELECTROPOP' | 'SOUL' | 'R&B' | 'RAP' | 'INDIE';

```

En cuanto a la clase `Song`, será el encargado de definir una canción en el sistema, el constructor recibirá diversos atributos que pondrá como privados. Estos son el nombre de la cancion (name) que sera de tipo string, el autor de la cancion (author) que será un array de string por lo comentado con anterioridad, la duracion de la cancion (duration) que será un numero en formato **xx.xx**, los generos de la canción (genres) que será un array de `genreInfo`, un flag (single) que determina si la canción fue un single (true) o no(false), el numero total de reproducciones de esta cancion (reproduction) y por ultimo el número de veces que se ha escuchado esta cancion (listener) que en artista lo recorreremos por cada cancion dentro y se sumará para sacar los oyentes mensuales.

En cuanto a los métodos se han definido los métodos de acceso (`Getters y Setter`) necesarios para cada uno de estos atributos y además se ha creado una función pública denominada *isFormat* que comprueba que el formato de la duración de la canciones sea el esperado, es decir, **xx.xx** siendo el primer par minutos y el segundo par segundos respectivamente.

```TypeScript
export class Song {

  constructor(private name: string, private author: String[], private duration: number, private genres: genreInfo[], private single: boolean, private reproductions: number, private listener: number) {
    this.author = author;
    this.duration = this.isFormat(duration);
    this.genres = genres;
    this.name = name;
    this.reproductions = reproductions;
    this.single = single;
    this.listener = listener;
  }

  getName(): string {
    return this.name;
  }

  getListener(): number {
    return this.listener;
  }

  getAutor(): String[] {
    return this.author;
  }


  getDuration(): number {
    return this.duration;
  }

  getGenres(): genreInfo[] {
    return this.genres;
  }

  getReproducciones(): number {
    return this.reproductions;
  }

  getSingle(): boolean {
    return this.single;
  }

  isFormat(numero: number): number {
    let numberFormat: number | undefined;
    let RE = /^\d*(\.\d{1})?\d{0,1}$/;
    const stringNumber = numero.toString();
    if (RE.test(stringNumber)) {
      numberFormat = numero;
    } else {
      numberFormat = NaN;
    }
    return numberFormat;
  }
}


```
En cuanto a los test se han creado diversas canciones pertenecientes a diversos artistas y se ha comprobado cada método comentado con anterioridad.

```TypeScript
import 'mocha';
import {expect} from 'chai';
import {Song} from '../src/models/song';

let song1 = new Song("Listen Before I Go", ['Billie Eillish'], 4.03, ['POP'], false, 82368601, 99512);
let song2 = new Song("In the End", ['Likin Park'], 3.36, ['ROCK'], false, 654122, 22358);
let song3 = new Song("Inmortal", ['J Cole'], 3.21, ['RAP', 'HIP-HOP'], true, 399964, 82368);

describe('Tests de la clase Cancion', ()=>{
  it('Test de instancia de diferentes Canciones', ()=> {
    expect(song1).to.exist;
    expect(song2).to.exist;
    expect(song3).to.exist;
  });

  it('Test de los metodos de la Cancion numero 1', ()=>{
    expect(song1.getName()).to.be.eql('Listen Before I Go');
    expect(song1.getAutor()).to.be.eql(['Billie Eillish']);
    expect(song1.getDuration()).to.be.eql(4.03);
    expect(song1.getGenres()).to.be.eql(['POP']);
    expect(song1.getReproducciones()).to.be.eql(82368601);
    expect(song1.getSingle()).to.be.eql(false);
    expect(song1.getListener()).to.be.eql(99512);
  });
  it('Test de los metodos de la Cancion numero 2', ()=>{
    expect(song2.getName()).to.be.eql('In the End');
    expect(song2.getAutor()).to.be.eql(['Likin Park']);
    expect(song2.getDuration()).to.be.eql(3.36);
    expect(song2.getGenres()).to.be.eql(['ROCK']);
    expect(song2.getReproducciones()).to.be.eql(654122);
    expect(song2.getSingle()).to.be.eql(false);
    expect(song2.getListener()).to.be.eql(22358);
  });
  it('Test de los metodos de la Cancion numero 3', ()=>{
    expect(song3.getName()).to.be.eql('Inmortal');
    expect(song3.getAutor()).to.be.eql(['J Cole']);
    expect(song3.getDuration()).to.be.eql(3.21);
    expect(song3.getGenres()).to.be.eql(['RAP', 'HIP-HOP']);
    expect(song3.getReproducciones()).to.be.eql(399964);
    expect(song3.getSingle()).to.be.eql(true);
    expect(song3.getListener()).to.be.eql(82368);
  });
});

```

<br/><br/>

### 2.3. Clase Playlist. <a name="id23"></a>

En cuanto a la clase `Playlist` no se ha cambiado su diseño puesto que una playlist contiene una lista de canciones que son las que el usuario quiere guardar y más tarde reproducir. Por lo que una playlist dentro de nuestro sistema tendra un atributo nombre (name) de tipo string, una lista de canciones (songs) que sera un array de `Song`, un array de generos (genres) que serán todos los generos que tiene la playlist `GenreInfo` y la duracion total de la playlist que se calcula automaticamente al crear la playlist puesto que es la suma de la duracion de las canciones.

En cuanto a métodos, cuenta con los métodos de acceso necesarios (`Getters y Setters`) para cada uno de estos atributos.

```TypeScript
import {Song} from "./song";
import {genreInfo} from "./song";

export class Playlist {

  constructor(private name: string, private songs: Song[], private duration: number, private genres: genreInfo[]) {
    this.songs = songs;
    this.duration = duration;
    this.genres = genres;
    this.name = name;
  }

  getSongs(): Song[] {
    return this.songs;
  }

  getNameSong(): string {
    this.songs.forEach((item) => {
      return item.getName();
    });
    return "No existe ningun nombre";
  }

  getArtistSong(): string {
    this.songs.forEach((item) => {
      return item.getAutor();
    });
    return "No existe ningun Artista o Grupo asociado";
  }

  getDurationSong(): number {
    this.songs.forEach((item) => {
      return item.getDuration();
    });
    return -1;
  }

  getGenrePlaylist(): string {
    this.songs.forEach((item) => {
      return item.getGenres();
    });
    return "No existe Genero";
  }

  getDuration(): number {
    return this.duration;
  }

  getGenres(): genreInfo[] {
    return this.genres;
  }

  getName(): string {
    return this.name;
  }

  setPlaylistSong(newItem: Song[]): void {
    this.songs = newItem;
  }
}

```

Para las pruebas unitarias de esta clases hemos comprobado que se cree de forma correcta una playlist que contiene diversas canciones mezcladas.

```TypeScript
import 'mocha';
import {expect} from 'chai';
import {Playlist} from '../src/models/playlist';
import {Song} from '../src/models/song';

let song1 = new Song("Listen Before I Go", ['Billie Eillish'], 4.03, ['POP'], false, 82368601, 823680);
let song2 = new Song("Billie Bossa Nova", ['Billie Eillish'], 3.16, ['R&B'], false, 87082953, 870820);
let song3 = new Song("my future", ['Billie Eillish'], 3.30, ['R&B'], true, 306917025, 3069170);
let song4 = new Song("Oxytocin", ['Billie Eillish'], 3.30, ['POP'], false, 82436281, 824360);
let song5 = new Song("In the End", ['Likin Park'], 3.36, ['ROCK'], false, 654122, 22358);
let song6 = new Song("Inmortal", ['J Cole'], 3.21, ['RAP', 'HIP-HOP'], true, 399964, 82368);

let playlist1 = new Playlist("Playlist1", [song1, song2, song3, song4, song5, song6], 45.23, ['POP', 'ROCK', 'RAP']);


describe('Test de la clase Playlist', ()=>{
  it('Pruebas de instancia de Playlist', ()=>{
    expect(playlist1).to.exist;
  });
  it('Test de los metodos de la playlist 1', ()=>{
    expect(playlist1.getName()).to.be.eql('Playlist1');
    expect(playlist1.getSongs()).to.be.eql([song1, song2, song3, song4, song5, song6]);
    expect(playlist1.getGenres()).to.eql(['POP', 'ROCK', 'RAP']);
    expect(playlist1.getDuration()).to.be.eql(45.23);
  });
});
```

<br/><br/>

### 2.4. Esquema Artista. <a name="id24"></a>

Dentro de este proyecto en la ruta `src/schema/` encontramos los diversos esquemas con los que se define como se va a guardar la información en nuestra base de datos.

Especificamente para ver el esquema de un artista, nos situamos en `src/schema/artisSchema.ts`. Aqui se define el esquema de la clase artistas, basicamente un esquema es un mecanismo por el cual se puede modelar un objeto en Mongoose, de forma resumida en un esquema se definen las cualidades de un objeto, en este caso artista, es decir, el nombre, los generos, las cancione y los oyentes. Hay que resaltar que como puede observar artista implementa dentro de este una lista de esquemas de tipo cancion, esto es debido a que un artista implementa diversas canciones y no al reves.

Estos atributos tienen una serie de opciones que se activan para dar una cierta funcionalidad.
* `type`: especifica el tipo de dato que se almacenará en ese campo especificado.
* `required`: especifica si es un atributo obligatorio a la hora de crear el objeto, al colocarlo en **true** especificamos que los sea.
* `unique`: define si puede haber objetos con este atributo duplicado en nuestra base de datos, si se activa **true**, entonces no se podrán repetir el atributo.
* `trim`: Elimina los espacios sobrantes que pueda tener el string al principio y/o al final.
* `validate`: Esta opcion especifica una comprobación que debe pasar este atributo. Por ejemplo, name  recibe el contenido a almacenar y realiza una comprobación. Esta comprobación se realiza a través de una expresión regular, que comprueba si la primera letra del string es una letra mayúscula contemplada en el alfabeto español.

```TypeScript
import * as mongoose from 'mongoose';
import {Artist} from '../models/artist';
import {songSchema} from '../schema/songSchema';

export const artistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: (value: string) => {
      if (!value.match(/^[A-ZñÑ][a-zA-ZñÑ ]*$/)) {
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

```
En la última línea del documento, se aplica el método `model` que especifica el esquema que debe seguir los objetos antes de ser insertados en una colección de la base de datos.

```TypeScript
export const artistModel = mongoose.model<Artist>('artist', artistSchema);
```
Como no se ha explicado las pruebas unitarias para comprobar el funcionamiento de MongoDB y Mongoose, es decir, para comprobar el funcionamiento de servidores a través de aplicaciones especificas, no hemos podido implementar pruebas unitarias para este esquema.


<br/><br/>

### 2.5. Esquema Cancion. <a name="id25"></a>

El esquema de una cancion situado en `src/schema/songSchema.ts` es similar al esquema anterior, lo unico que cambiamos es el tipo de atributos que recoge y el valor recogido en los mismos. estos serian un nombre que debe empezar por mayuscula y solo puede contener letras o numeros, luego un autor que sera una lista de strings con el nombre de los autores, una lista de generos que sera una lista de string cuyo valor debera estar contenido  en la opcion `enum`, un boleano que defina si fue single o no, un numero de reproducciones de la cancion y un numero de oyentes para posteriormente calcular los oyentes mensuales del artista.


```TypeScript
import * as mongoose from 'mongoose';
import {Song} from '../models/song';

export const songSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    validate: (value: string) => {
      if (!value.match(/^[A-Za-z0-9]*$/)) {
        throw new Error('El nombre de la cancion tiene que empezar con una mayúscula y solo pueden estar formados por letras o numeros.');
      }
    },
  },
  author: {
    type: [String],
    unique: true,
    required: true,
    trim: true,
  },
  duration: {
    type: Number,
    required: true,
    trim: true,
  },
  genres: {
    type: [String],
    required: true,
    trim: true,
    enum: ['CLASICA', 'ROCK', 'HIP-HOP', 'REGGEATON', 'POP', 'TRAP', 'PUNK', 'K-POP', 'METAL', 'CUMBIA', 'BLUES',
      'JAZZ', 'COUNTRY', 'EDM', 'FLAMENCO', 'SALSA', 'REGGAE', 'GOSPEL', 'DISCO', 'BANDA SONORA', 'ALTERNATIVO', 'ELECTROPOP', 'SOUL', 'R&B', 'RAP', 'INDIE'],
  },
  single: {
    type: Boolean,
    required: true,
    trim: true,
  },
  reproduction: {
    type: Number,
    required: true,
    trim: true,
  },
  listener: {
    type: Number,
    required: true,
    trim: true,
  },
});


```
 Y de la misma manera que se hizo en el esquema de artistas se termina por especificar este modelo a través del metodo `model` de Mongoose

```TypeScript
export const songModel = mongoose.model<Song>('song', songSchema);
```

Las pruebas unitarias tampoco se han podido realizar para este modelo por el motivo comentado anteriormente

<br/><br/>

### 2.6. Esquema Playlist. <a name="id26"></a>

El esquema de una playlist situado en `src/schema/playlistSchema.ts` funciona exactamente igual que el de los restos, la unica diferencia son los valores implementados puesto que por ejemplo, el nombre de una playlist puede estar formado por letras o numeros, ademas de que playlist implementa una lista de esquemas de cancion. Y luego creamos y exportamos este modelo a través del método `model` de **Mongoose**.

```TypeScript
import * as mongoose from 'mongoose';
import {songSchema} from '../schema/songSchema';
import {Playlist} from '../models/playlist';

export const playlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    validate: (value: string) => {
      if (!value.match(/^[A-Za-z0-9]*$/)) {
        throw new Error('El nombre de la Playlist tiene que empezar con una mayúscula y solo pueden estar formados por letras o numeros.');
      }
    },
  },
  songs: {
    type: [songSchema],
    unique: true,
    required: true,
    trim: true,
  },
  duration: {
    type: Number,
    required: false,
  },
  genres: {
    type: [String],
    required: true,
    trim: true,
    enum: ['CLASICA', 'ROCK', 'HIP-HOP', 'REGGEATON', 'POP', 'TRAP', 'PUNK', 'K-POP', 'METAL', 'CUMBIA', 'BLUES',
      'JAZZ', 'COUNTRY', 'EDM', 'FLAMENCO', 'SALSA', 'REGGAE', 'GOSPEL', 'DISCO', 'BANDA SONORA', 'ALTERNATIVO', 'ELECTROPOP', 'SOUL', 'R&B', 'RAP', 'INDIE'],
  },
});

export const playlistModel = mongoose.model<Playlist>('playlist', playlistSchema);

```

Las pruebas unitarias tampoco se han podido realizar para este modelo por el motivo comentado anteriormente

<br/><br/>

### 2.7. Router por Defecto. <a name="id27"></a>

En la ruta src/routers especificamos las funciones CRUD (get, post, patch, delete) encargadas de leer, añadir, modificar y eliminar para cada uno de los objetos contemplados en la aplicación: canciones, artista y menPLaylists. Para ello, tenemos separados en 3 ficheros diferentes (una para cada tipo) esas funciones y sus diferentes puntos de acceso a estas aplicaciones (/song, / artist, /playlist).


En el caso del router por defecto `defaultRouter` define un unico router y la ruta generica `*`. El propósito de esto es el de crear un receptor por defecto para todas esas peticiones erróneas, ya sea porque se realizan a una ruta no soportada o usando un tipo de mensaje incorrecto y serán respondidas con un status 501.


```TypeScript
import * as express from 'express';

export const defaultRouter = express.Router();

defaultRouter.all('*', (_, res) => {
  res.status(501).send();
});

```

### 2.8. Routers de Artistas, Canciones y Playlists. <a name="id28"></a>

Pese a que las estructuras de datos que se almacenan en la base de datos son diferentes se tratan de la misma manera e incluso las funciones que encontramos dentro de los routers son bastante similares. En nuestro caso hemos decicido organizar los puntos de acceso y los ficheros en función de las estructuras de datos contempladas, otra posible solución es la que se propuso en las sesiones teoricas de la asignatura, esta sería crear los ficheros y las funciones en base a las operaciones que se quieran tratar sobre la estructura. Por ejemplo, crear un fichero `post.ts` que defina para los diversos datos las funciones de creación. 

Sin embargo, como hemos dicho nosotros lo organizamos en base a la estructura que queremos almacenar, es decir, creamos tres ficheros, uno por cada clase (cancion, artista y playlist) y dentro definimos las operaciones CRUD (crear, leer, modificar y eliminar) para cada clase correspondiente.

Por ejemplo para el router de un artista, primero debemos crealo a través de `express.Router()`. Al utilizar esta función esta variable pasa a ser un objeto que tiene varias opciones respecto al tipo de peticiones que puede recibir. Por lo que a continuación debemos especificar que sucede cuando el objeto recibe alguna de estas peticiones:

* En el caso de la petición `get`: Se activa este receptor al recibir una peticion get sobre la ruta `/artist`. Y se guarda en la variable *filter* el nombre del artista que lo recibe a través del manejador **req** y extrae el valor que se le ha pasado en el link y lo transforma a un string.

Posteriormente dentro de un bloque tipo `try-catch`para controlar los posibles errores que sucedan en la función, se realiza una busqueda de manera asíncrona. Esta búsqueda se basa en realizar una búsqueda del nombre que hay guardado en `filter` dentro de todos los elementos que hay de tipo `artisModel` dentro de nuestra base de datos. En caso de que no se encuentre se rompe la promesa especificada y se devuelve el error con código de status 500. En caso de que se encuentre un elemento en la colección que coincida se devuelve el objeto al cliente. De esta forma implementamos la petición `get` a través de una query string.

```TypeScript
import * as express from 'express';
import {artistModel} from '../schema/artistSchema';

export const artistRouter = express.Router();

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

```


Hay otra función get especificada que realiza el mismo funcionamiento pero esta vez recibe el **ID** del objeto que quiere buscar logrando ser una función más corta y óptima ya  model` tiene un método `findById()` al cual se le pasa el id y comprueba si existe, en caso afirmativo, devolvuelve el resultado.

```TypeScript

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
```
* En el caso de que la petición sea `post`: se recibe a través de la promesa  `req` los datos necesarios en el cuerpo de la peticion para crear un nuevo objeto en la base de datos. No hace falta asegurarse de que los datos recibidos esten en el formato correcto, esto ya lo hacemos en los modelos especificados. Por lo que simplemente hacemos  un nuevo objeto con los valores pasado al cuerpo de la peticion y después hacemos uso de la función `save()` que guardará en la coleccion este nuevo objeto.

```TypeScript
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

```
Esta petición tiene un plus y esque se realiza previamente a la creación del objeto el cálculo de los oyentes mensuales de un artista. Para ello obtenemos de la petición todas las canciones que tiene el artistas, las recorremos y vamos sumando de forma concatenada los oyentes de la canción para finalmente cuando acabe la suma asociarla al valor de los oyentes. Realizando la parte solicitada de calcular en base a los oyentes de las canciones los oyentes mensuales de los artistas. De hecho se realizó un plus muy similar que es sacar la duracion de la playlist en base a la duracion de cada cancion que este dentro de la playlist. Simplemente se obtiene el array de canciones y se van sumando para posteriormente asociarlo a la duracion de la playlist, tal y como puede observarse.

```TypeScript
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
```

* En el caso de que la petición sea una modificación `patch`: esta la consideraría la funcionalidad más complicada puesto que especificamos una serie de variables actualizables y se comprueba si los elementos nuevos que se han recibido en el cuerpo se pueden actualizar. Tras habernos asegurado de que se puede realizar la actualización se realiza la función `findOneAndUpdate` que su función es básicamente buscar el nombre del artista en la base de datos  una vez encontrado, se sustituye el body por los datos nuevos a actualizar.


```TypeScript
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

```

Se realizo el mismo método pero esta vez por **ID** en este caso el funcionamiento es el mismo pero esta vez con la función `findByIdAndUpdate` que busca el elemento por su ID y sustituye el cuerpo por el especificado en la petición.

```TypeScript
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

```

* En el caso de que la petición sea `delete`: En el caso de que se quiera eliminar un elemento de la colección, recibe el query string con el nombre del elemento que se quiere eliminar, comprueba que no este vacía y que exista dentro de la base de datos. En caso de que se encuentre este elemento se elimina de la base de datos todas las coincidencias que encuentre con el método `findOneAndDelete`. Una vez eliminado el objeto se devuelve el objeto que se ha eliminado al usuario.

```TypeScript

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
```
Al igual que se hizo con las anteriores, también realizamos la eliminación a través del **ID** del objeto en la base de datos. tras buscarlo y encontrarlo se elimina con la funcion `findByIdAndDelete` devolviendo como resultado el objeto que se ha eliminado de la colección.

```TypeScript
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
```

Resaltar que para los dos routers restantes el funcionamiento es el mismo solo cambiando la estructura de datos a la necesarioa al hacer una petición sobre el body.

### 2.9. Fichero Mongoose.ts. <a name="id29"></a>

```
code
```


```
test
```
### 2.10. Fichero index.ts. <a name="id210"></a>

```
code
```


```
test
```

<br/><br/>



## 3. Intrucciones de uso. <a name="id3"></a>

Aqui van las intrucciones una vez desplegada la API

https://isound-api-joel-mica.herokuapp.com/song

## 4. Dificultades. <a name="id4"></a>

Dentro de las dificultades encontradas dentro de esta práctica, me gustaría resaltar:

* Una dificultad que hemos tenido ha sido la ejecución de la base de datos puesto que saltaba un error con las funciones del **node_modules**. Finalmente tras buscar por internet encontramos que el problema era debido a la versión 17.05 de node.js que era la que estabamos utilizando, se recomendaba utilizar una inferior. Sin embargo, tras comentarlo con el profesorado nos decantamos por utilizar la version 18.1.0 de Node.js. Para ello se ejecutaron los comandos oportunos para instalar y utilizar esta version

```
[~/ull-esit-inf-dsi-21-22-prct12-music-api-grupo-m(main)]$node -v 
[~/ull-esit-inf-dsi-21-22-prct12-music-api-grupo-m(main)]$nvm install v18.1.0
[~/ull-esit-inf-dsi-21-22-prct12-music-api-grupo-m(main)]$nvm use v18.1.0
```

A través de estas instrucciones se puede instalar y cambiar a la versión que se utiliza en este proyecto.

<br/>

* otra dificultad fue al utilizar las clases ya que según lo comprendimos tras leer detenidamente el enunciado el diseño de las clases habia que abordarlo con otro punto de vista tal y como se comento con anterioridad ya que de esta forma se puede realizar un calculo sobre los oyentes y la duracion de la cancion.

## 5. Conclusión. <a name="id5"></a>

Los objetivos que se han propuesto y se han cumplido son:

* 1. Realizar la creación de una API de gestion de informacion musical y el manejo de sus datos con los módulos especificados en el enunciado de la misma.
* 2. Utilización de Node.Js para ejecutar el servicio.
* 3. MongoDB y Mongoose para la creación de la Base de datos.
* 4. Operaciones CRUD (CREATE-READ-UPDATE-DELETE) para manejar los datos introducidos a esta base de datos.
* 5. Se ha utilizado ThunderClient para realizar las peticiones de las diversas operaciones.
* 6. MongoDB Atlas para establecer un Cluster y un servidor al que acceder al hacer peticiones.
* 7. Heroku para desplegar la API y asociarle una dirección.

mongodb+srv://iSounD:iSoundDSI@cluster0.yp5l1.mongodb.net/iSOunD

A forma de resumen para concluir, gracias a esta práctica y los diversos módulos abordados hemos podido crear una aplicación intuitiva, sólida y robusta para implementar, en este caso, un sistema de gestión de información musical.


## 6. Referencias. <a name="id6"></a>
1. [Github](http://github.com)
2. [Repositorio de la Pŕactica](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct12-music-api-grupo-m.git)
3. [Guión de la Pŕactica 12](https://ull-esit-inf-dsi-2122.github.io/prct12-music-api/)
4. [Documentación GitHub Actions](https://docs.github.com/en/actions)
5. [Documentación Istanbul](https://istanbul.js.org/)
6. [Documentación Coveralls](https://coveralls.io/)
7. [Documentación de TypeDoc.](https://typedoc.org/)
8. [Documentación de Mocha.](https://mochajs.org/)
9. [Documentación de Chai.](https://www.chaijs.com/)
10. [Documentacion de Sockets en Node.js](http://www.w3big.com/es/nodejs/nodejs-net-module.html)
11. [Documentacion del módulo Express](http://expressjs.com/)
12. [Documentacion de MongoDB](https://www.mongodb.com/)
13. [Descarga de comunity server de MongoDB](https://www.mongodb.com/try/download/community)
14. [Documentacion de Heroku](https://www.heroku.com)
15. [Documentacion de Mongoose para Node.Js](https://mongoosejs.com/)
16. [Documentacion del modulo de Validator](https://www.npmjs.com/package/validator)
17. [Documentacion del modulo de Mongoose](https://www.npmjs.com/package/mongoose)
18. [Extension de MongoDB para VSC](https://code.visualstudio.com/docs/azure/mongodb)
19. [MongoDB para Node.JS](https://mongodb.github.io/node-mongodb-native/3.7/)
20. [Códigos de status de las diversas peticiones](https://www.webfx.com/web-development/glossary/http-status-codes/)
21. [Fuente de solución al problema de node_modules](https://stackoverflow.com/questions/71126745/why-my-mongoose-not-working-in-my-every-project)
