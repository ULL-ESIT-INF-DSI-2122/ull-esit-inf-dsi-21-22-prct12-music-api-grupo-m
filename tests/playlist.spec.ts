import 'mocha';
import {expect} from 'chai';
import {Playlist} from '../src/models/playlist';
import {Song} from '../src/models/song';

let song1 = new Song("Listen Before I Go", ['Billie Eillish'], 4.03, ['POP'], false, 82368601, 823680);
let song2 = new Song("Billie Bossa Nova", ['Billie Eillish'], 3.16, ['R&B'], false, 87082953, 870820);
let song3 = new Song("my future", ['Billie Eillish'], 3.30, ['R&B'], true, 306917025, 3069170);
let song4 = new Song("Oxytocin", ['Billie Eillish'], 3.30, ['POP'], false, 82436281, 824360);
let song5 = new Song("In the End", ['Likin Park'], 3.36, ['ROCK'], false, 654122, 22358);
let song6 = new Song("Inmortal", ['J Cole'], 3.21, ['RAP', 'HIP-HOP'], true, 399964, 82368);

let playlist1 = new Playlist("Playlist1", [song1, song2, song3, song4, song5, song6], 45.23, ['POP', 'ROCK', 'RAP']);


describe('Test de la clase Playlist', ()=>{
  it('Pruebas de instancia de Playlist', ()=>{
    expect(playlist1).to.exist;
  });
  it('Test de los metodos de la playlist 1', ()=>{
    expect(playlist1.getName()).to.be.eql('Playlist1');
    expect(playlist1.getSongs()).to.be.eql([song1, song2, song3, song4, song5, song6]);
    expect(playlist1.getGenres()).to.eql(['POP', 'ROCK', 'RAP']);
    expect(playlist1.getDuration()).to.be.eql(45.23);
  });
});
