import { Album } from "./album";
import { Song } from "./song";
import { genreInfo } from "./genre";
import {Group} from "./group";
/**
 * Clase encargada de especificar a los diferentes musicos u artistas que forman parte de grupos o tienen carreras en solitario.
 */
export class Artist {
  private groupList: Group[] = [];
  private songsList: Song[] = [];
  private albumList: Album[] = [];
  private listenerMensual: number = 0;
  /**
   * Constructor de la entidad Artistas del sistema.
   * @param name nombre del artista.
   * @param genre generos en los que suele trabajar el artista
   * @param albumes albumes que ha publicado un artista
   * @param listenerIndi cantidad de oyentes mensuales que tiene un artista en especifico.
   * @param listenerMensual Cantidad de oyentes mensuales de un grupo, en caso de ser una carrera solitaria es igual a los oyentes individuales.
   */
  constructor(private name: string, private genres: genreInfo[], private listenerIndi: number) {
    this.name = name;
    this.genres = genres;
    this.listenerIndi = listenerIndi;
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
   * metodo encargada de mostrar los grupos a los que pertenece el artista.
   * @returns devuelve lso grupos en los que se encuentra el artista.
   */
  getGroupList(): Group[] {
    return this.groupList;
  }

  /**
   * metodo que devuelve los generos musicales relacionados
   * @returns devuelve el genero musical relacionado a ese artista.
   */
  getGenre(): genreInfo[] {
    return this.genres;
  }

  /**
   * metodo que devuelve los albumes lanzados por el artista
   * @returns el album lanzado por el artista
   */
  getAlbumList(): Album[] {
    return this.albumList;
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
    if (this.groupList.length > 0) {
      this.groupList.forEach((group) => {
        result += group.getOyentes();
      });
    }
    return result + this.listenerIndi;
  }
  /**
   * Metodo encargado de añadir un nuevo elemento al atributo privados grupos
   * @param newGrupo Nuevo item a añadir al grupo
   * @return añade un nuevo grupo.
   */
  public setGroups(newGroupList: Group[]): void {
    this.groupList = newGroupList;
  }

  /**
   * Metodo encargado de añadir un nuevo grupo a los grupos a los que pertenece el artista
   * @param newGrupo nuevo grupo que se añade
   */
  public addGroup(newGrupo: Group): void {
    this.groupList.push(newGrupo);
  }

  /**
   * Metodo encargado de añadir un nuevo elemento al atributo privados song
   * @param newGrupo Nuevo item a añadir a la lista de canciones
   * @return añade una nueva cancion.
   */
  public setSongList(newList: Song[]): void {
    this.songsList = newList;
  }

  /**
   * metodo que añade una nueva cancion que ha sacado el artista
   * @param newSong nueva cancion que publico el artista
   */
  public setSong(newSong: Song): void {
    this.songsList.push(newSong);
  }

  /**
   * Metodo encargado de añadir un nuevo elemento a la lista de albumes
   * @param newGrupo Nuevo item a añadir al album
   * @return añade un nuevo album a la lista de albumes.
   */
  public setAlbum(newAlbum: Album): void {
    this.albumList.push(newAlbum);
  }

  /**
   * metodo que actualiza los oyentes que tiene un artista
   * @param listeners numero de oyentes individuales que tiene el artista
   */
  public setListeners(listeners: number): void {
    this.listenerMensual = listeners;
  }
}
