import 'mocha';
import {expect} from 'chai';
import {Artist} from '../src/models/artist';
import {Song} from '../src/models/song';

let song1 = new Song("Listen Before I Go", ['Billie Eillish'], 4.03, ['POP'], false, 82368601, 823680);
let song2 = new Song("Billie Bossa Nova", ['Billie Eillish'], 3.16, ['R&B'], false, 87082953, 870820);
let song3 = new Song("my future", ['Billie Eillish'], 3.30, ['R&B'], true, 306917025, 3069170);
let song4 = new Song("Oxytocin", ['Billie Eillish'], 3.30, ['POP'], false, 82436281, 824360);

let artist1 = new Artist("Billie Eillish", ['POP', 'ALTERNATIVO'], [song1, song2, song3, song4], 82368601);

describe('Tests de la clase Artista', ()=>{
  it('Test de instancia de los diferentes artistas', ()=> {
    expect(artist1).to.exist;
  });

  it('Test de Métodos del artista', ()=> {
    expect(artist1.getName()).to.be.eql('Billie Eillish');
    expect(artist1.getGenre()).to.be.eql(['POP', 'ALTERNATIVO']);
    expect(artist1.getSongList()).to.be.eql([song1, song2, song3, song4]);
    expect(artist1.getListeners()).to.eql(82368601);
  });
});