import {Song} from "./song";
import {genreInfo} from "./song";
/**
 * Clase encargada de definir el funcionamiento de una lista de reproduccion de diversas canciones (Playlist) de una plataforma digital.
 */
export class Playlist {
  /**
   * Constructor de la clase Playlist que define el funcionamiento de una lista de reproduccion.
   * @param name Nombre de la playlist.
   * @param songList Lisya de canciones que componen la playlist.
   * @param duration duracion total de la playlist en horas y minutos.
   * @param genres genres musicales que se incluyen dentro de la playlist.
   */
  constructor(private name: string, private songList: Song[], private duration: number, private genres: genreInfo[]) {
    this.songList = songList;
    this.duration = duration;
    this.genres = genres;
    this.name = name;
  }

  /**
  * Método encargado de obtener la lista de canciones de la playlist.
  * @returns devuelve el atributo asociado a la lista de canciones de la playlist
  */
  getSongs(): Song[] {
    return this.songList;
  }

  /**
  * Metodo que se encarga de obtener el nombre de una cancion del array de canciones
  * @returns devuelve el nombre de una cancion de todas las que recoge la lista
  */
  getNameSong(): string {
    this.songList.forEach((item) => {
      return item.getName();
    });
    return "No existe ningun nombre";
  }

  /**
  * metodo encargado de obtener el nombre de los artistas de la canciones de la playlist
  * @returns devuelve el autor de la lista de canciones
  */
  getArtistSong(): string {
    this.songList.forEach((item) => {
      return item.getAutor();
    });
    return "No existe ningun Artista o Grupo asociado";
  }

  /**
  * metodo encargado de obtener la duracion de las canciones que hay en las playlist
  * @returns devuelve la duracion de las canciones de la Playlist
  */
  getDurationSong(): number {
    this.songList.forEach((item) => {
      return item.getDuration();
    });
    return -1;
  }

  /**
  * metodo encargado de obtener los generos de las canciones de la playlist.
  * @returns obtiene el genero de las canciones de la playlist
  */
  getGenrePlaylist(): string {
    this.songList.forEach((item) => {
      return item.getGenres();
    });
    return "No existe Genero";
  }

  /**
  * Metodo que devuelve la duracion total de la playlist.
  * @returns devuelve la duracion.
  */
  getDuration(): number {
    return this.duration;
  }

  /**
  * Metodo que devuelve los genres de las songList de la playlist.
  * @returns devuelve los genres de la playlist
  */
  getGenres(): genreInfo[] {
    return this.genres;
  }

  /**
  * Metodo que devuelve el name de la playlist
  * @returns devuelve el nombre de la playlist.
  */
  getName(): string {
    return this.name;
  }

  /**
  * establece un array de canciones al array de canciones de una playlist
  * @param newItem nuevo conjunto de canciones que perteneceran a una playlist.
  */
  setPlaylistSong(newItem: Song[]): void {
    this.songList = newItem;
  }
}
