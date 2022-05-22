/**
 * Objeto genreInfo que define los diferentes genero reconocidos dentro del sistema.
 */
export type genreInfo = 'CLASICA'| 'ROCK'| 'HIP-HOP' | 'REGGEATON' | 'POP' | 'TRAP' | 'PUNK' | 'K-POP' | 'METAL' | 'CUMBIA' | 'BLUES' | 'JAZZ'| 'COUNTRY' | 'EDM' | 'FLAMENCO' | 'SALSA' | 'REGGAE' | 'GOSPEL' | 'DISCO' | 'BANDA SONORA' | 'ALTERNATIVO' | 'ELECTROPOP' | 'SOUL' | 'R&B' | 'RAP' | 'INDIE';
/**
 * Clase encargada de representar una Canción en el sistema, el cual es una cantidad de atributos definidos.
 */
export class Song {
  /**
  * Constructor de una cancion en el sistema.
  * @param name titulo de la cancion.
  * @param autor autor de la cancion.
  * @param duration tiempo de duracion de la cancion musical.
  * @param genres genero en el que se engloba la cancion
  * @param single flag que determina si fue un single o es lanzado en un album
  * @param reproductions numero total de reproducciones de esta cancion
  * @param listener oyentes de la cancion
  */

  constructor(private name: string, private author: String[], private duration: number, private genres: genreInfo[], private single: boolean, private reproductions: number, private listener: number) {
    this.author = author;
    this.duration = this.isFormat(duration);
    this.genres = genres;
    this.name = name;
    this.reproductions = reproductions;
    this.single = single;
    this.listener = listener;
  }

  /**
  * metodo encargado de obtener el titulo de una cancion
  * @returns devuelve el titulo de una cancion
  */
  getName(): string {
    return this.name;
  }

  /**
   * Método encargado de obtener los oyentes de una canción
   * @returns devuelve los oyentes de una cancion
   */
  getListener(): number {
    return this.listener;
  }


  /**
  * Metodo que obtiene el autor de la cancion ya sea un artista
  * @returns devuelve un array de string que ha compuesto la cancion
  */
  getAutor(): String[] {
    return this.author;
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

  /**
   * Método que convierte un número al formato XX.XX
   * @param numero numero en formato
   * @returns devuelve el numero en formato de minutos y segundos
   */
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
