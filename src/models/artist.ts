import {Song} from "./song";
import {genreInfo} from "./song";
/**
 * Clase encargada de especificar a los diferentes musicos u artistas que forman parte de grupos o tienen carreras en solitario.
 */
export class Artist {
  private songsList: Song[] = [];
  private listenerMensual: number = 0;
  /**
   * Constructor de la entidad Artistas del sistema.
   * @param name nombre del artista.
   * @param genre generos en los que suele trabajar el artista
   * @param listenerMensual Cantidad de oyentes mensuales de un grupo, en caso de ser una carrera solitaria es igual a los oyentes individuales.
   * @param songList lista de las canciones del artista
   */
  constructor(private name: string, private genres: genreInfo[]) {
    this.name = name;
    this.genres = genres;
  }

  /**
   * metodo encargado de devolver el nombre del artista
   * @returns devuelve el nombre del artista
   */
  getName(): string {
    return this.name;
  }

  /**
   * Metodo que establece un nuevo nombre a un artista
   * @param newName nuevo nombre que se le quiere asociar a un artista
   */
  setName(newName: string): void {
    this.name = newName;
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
    return this.songsList;
  }

  /**
   * metodo que visualiza la cantidad de oyentes mensuales que tiene un artista
   * @returns devuelve la cantidad numerica de oyentes mensuales de un artista.
   */
  getOyentesMensual():number {
    return this.listenerMensual;
  }

  /**
   * Funcion que calcula la cantidad de oyentes mensuales totales en base al trabajo individual
   * @returns devuelve la suma del trabajo individual mas la cantidad de oyentes mensuales.
   */
  public calOyentes(): number {
    let result: number = 0;
    if (this.songsList.length > 0) {
      this.songsList.forEach((song) => {
        result += song.getListener();
      });
    }
    return result;
  }

  /**
   * Metodo encargado de añadir un nuevo elemento al atributo privados song
   * @param newGrupo Nuevo item a añadir a la lista de canciones
   * @return añade una nueva cancion.
   */
  public setSongList(newList: Song[]): void {
    this.songsList = newList;
    this.listenerMensual = this.calOyentes();
  }

  /**
   * metodo que añade una nueva cancion que ha sacado el artista
   * @param newSong nueva cancion que publico el artista
   */
  public setSong(newSong: Song): void {
    this.songsList.push(newSong);
  }


  public getListeners(): number {
    return this.listenerMensual;
  }
}
