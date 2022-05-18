# Práctica 12 -  API Node/Express de gestión de información musical
# Desarrollo de Sistemas Informáticos
# Universidad de la Laguna

### Autor:  
  * Joel Francisco Escobar Socas - alu0101130408@ull.edu.es
  * Micaela Lucia Mungay Juncal- alu0101124506@ull.edu.es

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

  2.8. [Router Artista.](#id28)

  2.9. [Router Canción.](#id29)

  2.10. [Router Playlist.](#id210)
    
  2.11. [Fichero Mongoose.ts](#id211)

  2.12. [Fichero index.ts.](#id212)

3. [Instrucciones de Uso.](#id3)

4. [Dificultades.](#id4)

5. [Conclusión.](#id5)

6. [Referencias.](#id6)

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

De forma resumida este es el contenido del directorio fuente de nuestra aplicación. Sin embargo, en los siguientes puntos vamos a explicar más en profundidad estos ficheros y la funcionalidad que toma.

### 2.1. Clase Artista. <a name="id21"></a>

La clase `1` es la encargada de descripcion.

Para especificar el color que puede tener una nota, definimos un objeto que solo puede contener un color de entre todos los que se pueden implementar.

```TypeScript
export type ColorNotes = 'Red' | 'Green' | 'Blue' | 'Yellow';
```
Para implementar la nota definimos la estructura básica que ha de tener,es decir, el titulo de la nota (*string*), el cuerpo de la nota (*string*) y el color de la nota (*ColorNote*).

Posteriormente se definen los métodos de acceso necesarios *Getters y Setter* para poder acceder o obtener los valores de estos atributos privados. Además de estos métodos tambien definimos por un lado **printTitle** que dependiendo del color de la nota que se introdujo a través de un string, muestra por consola a través de chark el titulo con el color que se introdujo. Por otro lado la función **printBody** realiza la misma idea pero con el cuerpo de la nota.

```TypeScript
code
```
Para realizar las pruebas unitarias desarrolladas en la metodologia TDD sobre esta clase `Note`, se define instancian los objetos de la clase nota y se comprueban los métodos de acceso *Getters y Setters*.

```TypeScript
test
```
<br/><br/>

### 2.2. Clase Cancion. <a name="id22"></a>

```
code
```


```
test
```

<br/><br/>

### 2.3. Clase Playlist. <a name="id23"></a>

```
code
```


```
test
```

<br/><br/>

### 2.3. Clase Playlist. <a name="id23"></a>

```
code
```


```
test
```

<br/><br/>

### 2.4. Esquema Artista. <a name="id24"></a>

```
code
```


```
test
```

<br/><br/>

### 2.5. Esquema Cancion. <a name="id25"></a>

```
code
```


```
test
```

<br/><br/>

### 2.6. Esquema Playlist. <a name="id26"></a>

```
code
```


```
test
```

<br/><br/>

### 2.7. Router por Defecto. <a name="id27"></a>

```
code
```


```
test
```

### 2.8. Router Artista. <a name="id28"></a>

```
code
```


```
test
```
### 2.9. Router Cancion. <a name="id29"></a>

```
code
```


```
test
```
### 2.10. Router Playlist. <a name="id210"></a>

```
code
```


```
test
```

<br/><br/>

### 2.11. Fichero Mongoose.ts. <a name="id211"></a>

```
code
```


```
test
```
<br/><br/>

### 2.12. Fichero index.ts. <a name="id212"></a>

```
code
```


```
test
```
<br/><br/>

## 3. Intrucciones de uso. <a name="id3"></a>

Aqui van las intrucciones una vez desplegada la API

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

* otra dificultad.

## 5. Conclusión. <a name="id5"></a>

Los objetivos que se han propuesto y se han cumplido son:

* 1. Realizar la creación de una API de gestion de informacion musical y el manejo de sus datos con los módulos especificados en el enunciado de la misma.
* 2. Utilización de Node.Js para ejecutar el servicio.
* 3. MongoDB y Mongoose para la creación de la Base de datos.
* 4. Operaciones CRUD (CREATE-READ-UPDATE-DELETE) para manejar los datos introducidos a esta base de datos.
* 5. Se ha utilizado ThunderClient para realizar las peticiones de las diversas operaciones.
* 6. MongoDB Atlas
* 7. Heroku para 

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
