import {Album} from "./album";
import {Song} from "./song";
import {Artist} from "./artist";
import {Group} from "./group";
/**
 * Objeto genreInfo que define los diferentes genero reconocidos dentro del sistema.
 */
export type genreInfo = 'CLASICA'| 'ROCK'| 'HIP-HOP' | 'REGGEATON' | 'POP' | 'TRAP' | 'PUNK' | 'K-POP' | 'METAL' | 'CUMBIA' | 'BLUES' | 'JAZZ'| 'COUNTRY' | 'EDM' | 'FLAMENCO' | 'SALSA' | 'REGGAE' | 'GOSPEL' | 'DISCO' | 'BANDA SONORA' | 'ALTERNATIVO' | 'ELECTROPOP' | 'SOUL' | 'R&B' | 'RAP' | 'INDIE';

/**
 * Clase encargada de implementar un genero musical dentro del sistema.
 */
export class Genre {
  /**
  * Constructor de la clase encargada de implementar el genero musical.
  * @param name nombre del genero.
  * @param artists artistas que hay dentro de un genero.
  * @param albums albums que hay dentro de un genero.
  * @param song song que hay dentro de un genero determinado.
  */
  constructor(private name: genreInfo, private artists: (Artist | Group)[], private albums: Album[], private song: Song[]) {
    this.name = name;
    this.artists = artists;
    this.albums = albums;
    this.song = song;
  }

  /**
  * Metodo que obtiene el nombre del genero.
  * @returns devuelve el nombre de un genero musical.
  */
  getNombre(): genreInfo {
    return this.name;
  }

  /**
  * Metodo que devuelve todos los artists dentro del genero.
  * @returns devuelve los artistas que estan englobados dentro de un genero.
  */
  getArtistas(): (Artist | Group)[] {
    return this.artists;
  }

  /**
  * metodo que devuelve los albums que hay dentro de un genero.
  * @returns devuelve los albums de un genero.
  */
  getAlbumes():Album[] {
    return this.albums;
  }

  /**
  * metodos que obtiene las songs que hay dentro de un genero.
  * @returns devuelve la lsita de songs de un genero determinado.
  */
  getSongs(): Song[] {
    return this.song;
  }
}
