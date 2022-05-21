import {Song} from "./song";
import {genreInfo} from "./song";
/**
 * Clase encargada de especificar a los diferentes musicos u artistas que han comopuesto una cancion.
 */
export class Artist {
  /**
   * Constructor de la entidad Artistas dentro del sistema.
   * @param name nombre del artista.
   * @param genre generos en los que suele trabajar el artista.
   * @param listenerMensual Cantidad de oyentes mensuales de un artista.
   * @param songList lista de las canciones que ha publicado un artista.
   */
  constructor(private name: string, private genres: genreInfo[], private songList: Song[], private listenerMensual: number) {
    this.name = name;
    this.genres = genres;
    this.songList = songList;
    this.listenerMensual = listenerMensual;
  }

  /**
   * metodo encargado de devolver el nombre del artista
   * @returns devuelve el nombre del artista
   */
  getName(): string {
    return this.name;
  }

  /**
   * metodo que devuelve los generos musicales relacionados
   * @returns devuelve el genero musical relacionado a ese artista.
   */
  getGenre(): genreInfo[] {
    return this.genres;
  }

  /**
   * Metodo encargado de devolver todas las canciones que tiene un artista
   * @returns devuelve las canciones que ha lanzado el artista.
   */
  getSongList(): Song[] {
    return this.songList;
  }

  /**
   * metodo que visualiza la cantidad de oyentes mensuales que tiene un artista
   * @returns devuelve la cantidad numerica de oyentes mensuales de un artista.
   */
  getOyentesMensual():number {
    return this.listenerMensual;
  }

  /**
   * Método encargado de obtener los oyentes mensuales de un artista.
   * @returns devuelve los oyentes mensuales de un artista.
   */
  public getListeners(): number {
    return this.listenerMensual;
  }
  /**
   * Funcion que calcula la cantidad de oyentes mensuales totales en base al trabajo individual
   * @returns devuelve la suma del trabajo individual mas la cantidad de oyentes mensuales.
   */
  public calOyentes(): number {
    let result: number = 0;
    if (this.songList.length > 0) {
      this.songList.forEach((song) => {
        result += song.getListener();
      });
    }
    return result;
  }

  /**
   * Metodo que establece un nuevo nombre a un artista
   * @param newName nuevo nombre que se le quiere asociar a un artista
   */
  setName(newName: string): void {
    this.name = newName;
  }
}
