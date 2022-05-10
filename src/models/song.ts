import {Artist} from "./artist";
import {genreInfo} from "./genre";
import {Group} from "./group";

/**
 * Clase encargada de representar la cancion que ha publicado un artista y que se encuentra en un Album.
 */
export class Song {
  /**
  * Constructor de uya cancion del sistema.
  * @param name titulo de la cancion.
  * @param autor autor de la cancion.
  * @param duration tiempo de duracion de la cancion musical.
  * @param genres genero en el que se engloba la cancion
  * @param single flag que determina si fue un single o es lanzado en un album
  * @param reproductions numero total de reproducciones de esta cancion
  */
  private id: number = 0;
  constructor(private name: string, private autor: Artist | Group, private duration: number, private genres: genreInfo[], private single: boolean, private reproductions: number) {
    this.autor = autor;
    this.duration = duration;
    this.genres = genres;
    this.name = name;
    this.reproductions = reproductions;
    this.single = single;
    this.id = this.setId();
  }

  /**
  * metodo encargado de obtener el titulo de una cancion
  * @returns devuelve el titulo de una cancion
  */
  getName(): string {
    return this.name;
  }


  /**
  * metodo encargado de obtener el id de una cancion
  * @returns devuelve el id de una cancion
  */
  getId(): number {
    return this.id;
  }

  /**
  * metodo encargado de establecer el id de una cancion
  *
  */
  setId(): number {
    return this.id + 1;
  }

  /**
  * Metodo que obtiene el autor de la cancion ya sea un artista o un grupo
  * @returns devuelve un array de artistas o de grupos que ha realizado la cancion
  */
  getAutor(): Artist | Group {
    return this.autor;
  }

  /**
  * Metodo que obtiene la duracion de la cancion
  * @returns devuelve la duracion total de la cancion.
  */
  getDuration(): number {
    return this.duration;
  }

  /**
  * metodo que obtiene el atributo encargado de definir el genero de una cancion
  * @returns devuelve el genero en el que se engloba una cancion.
  */
  getGenres(): genreInfo[] {
    return this.genres;
  }

  /**
  * metodo que obtiene el numero total de reproducciones de una cancion
  * @returns el numero total de reproducciones de la cancion
  */
  getReproducciones(): number {
    return this.reproductions;
  }

  /**
  * metodo encargado de determinar si fue un single o no.
  * @returns devuelve un flag que determina si es un single (true) o no (false).
  */
  getSingle(): boolean {
    return this.single;
  }
}
