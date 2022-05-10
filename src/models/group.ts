import {Album} from "./album";
import {genreInfo} from "./genre";
import {Artist} from "./artist";
/**
 * Clase encargada de implementar la entidad de un grupo, asociacion de diversos artistas.
 */
export class Group {
  private albums: Album[] = [];
  /**
   * Constructor de la clase Grupo
   * @param name nombre del grupo
   * @param artists artistas que conforman el grupo
   * @param anioCreacion anio de creacion del grupo
   * @param genre genero en el que se encasilla un grupo
   * @param listeners cantidad de oyentes mensuales que tiene un grupo
   */
  constructor(private name: string, private artists: Artist[], private anioCreacion: number, private genre: genreInfo[], private listeners: number) {
    this.name = name;
    this.artists = artists;
    this.anioCreacion = anioCreacion;
    this.genre = genre;
    this.listeners = listeners;
  }

  /**
  * metodo encargado de obtener el nombre del grupo
  * @returns devuelve el nombre del grupo
  */
  getNombre(): string {
    return this.name;
  }

  /**
  * metodo que obtiene los artistas que conforman el grupo
  * @returns devuelve los artistas que conforman el grupo
  */
  getArtistas(): Artist[] {
    return this.artists;
  }

  /**
  * Metodo que obtiene el anio de creacion del grupo
  * @returns devuelve el anio en el que se creo el grupo.
  */
  getAnioCreacion(): number {
    return this.anioCreacion;
  }

  /**
  * metodo que obtiene el genero en el que trabaja un grupo
  * @returns devuelve el genero en el que se engloba al grupo
  */
  getGenero(): genreInfo[] {
    return this.genre;
  }

  /**
  * metodo que obtiene los albums que ha lanzado el grupo
  * @returns devuelve los albumnes que ha lanzado el grupo.
  */
  getAlbumes(): Album[] {
    return this.albums;
  }

  /**
  * metodo que obtiene la cantida de oyentes mensuales del grupo
  * @returns devuelve la cantidad de oyentes mensuales del grupo.
  */
  public getOyentes(): number {
    return this.listeners;
  }

  /**
  * Metodo encargado de establecer un valor al album
  * @param newAlbum nuevo elemento a añadir en la lista de albums.
  */
  public setAlbum(newAlbum : Album): void {
    this.albums.push(newAlbum);
  }
}
