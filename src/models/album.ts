import {Artist} from "./artist";
import {genreInfo} from "./genre";
import {Song} from "./song";
import {Group} from "./group";

/**
 * Clase encargada de representar un album, es decir, la informacion relativa a un disco musical.
 */
export class Album {
  /**
  * Constructor de la clase Album.
  * @param name Nombre del album.
  * @param artist Artist u grupo que ha publicado el album.
  * @param anioPubli El año en el que se ha publicado el album.
  * @param genre Genre musical del album.
  * @param song Lista de song dentro del album.
  */

  constructor(private name: string, private artist: (Artist | Group)[], private anioPubli: number, private genre: genreInfo[], private song: Song[]) {
    this.name = name;
    this.anioPubli = anioPubli;
    this.genre = genre;
    this.song = song;
    this.artist = artist;
  }

  /**
  * metodo que devuelve el nombre del album
  * @returns devuelve el nombre del album
  */
  getName(): string {
    return this.name;
  }

  /**
  * metodo que obtiene el atributo privado del año de publicacion
  * @returns devuelve el año de lanzamiento del album
  */
  getYear(): number {
    return this.anioPubli;
  }

  /**
  * metodo que obtiene el genero musical del album
  * @returns devuelve el genero en el que se encuentra el album.
  */
  getGenero(): genreInfo[] {
    return this.genre;
  }

  /**
  * metodo que devuelve una lista de song dentro del album.
  * @returns devuelve la lista de song que contiene el album.
  */
  getTracklist(): Song[] {
    return this.song;
  }

  /**
  * metodo que devuelve el artista o banda.
  * @returns devuelve la lista de song que contiene el album.
  */
  getArtist(): (Artist | Group)[] {
    return this.artist;
  }
}
