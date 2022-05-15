import 'mocha';
import {expect} from 'chai';
import {Playlist} from '../src/models/playlist';
import {Song} from '../src/models/song';
import {Artist} from '../src/models/artist';

let artist1 = new Artist("Billie Eillish", ['POP', 'ALTERNATIVO']);
let song1 = new Song("Listen Before I Go", [artist1], 4.03, ['POP'], false, 82368601, 82368);
let song3 = new Song("Billie Bossa Nova", [artist1], 3.16, ['R&B'], false, 87082953, 87082);
let song4 = new Song("my future", [artist1], 3.30, ['R&B'], true, 306917025, 306917);
let song5 = new Song("Oxytocin", [artist1], 3.30, ['POP'], false, 82436281, 82436);
let song6 = new Song("GOLDWING", [artist1], 2.31, ['POP'], false, 50221104, 50221);
let song7 = new Song("Lost Cause", [artist1], 3.32, ['POP'], true, 181748562, 181748);
let song8 = new Song("Halley's Comet", [artist1], 3.54, ['POP'], false, 74773544, 74773);
let song10 = new Song("OverHeated", [artist1], 3.34, ['POP'], false, 41873321, 41873);
let song11 = new Song("Everybody Dies", [artist1], 3.26, ['POP'], false, 42128791, 42128);
let song12 = new Song("Your Power", [artist1], 4.05, ['POP'], true, 261975001, 261975);
let song13 = new Song("NDA", [artist1], 3.15, ['ELECTROPOP', 'ALTERNATIVO'], true, 154235501, 154235);
let song14 = new Song("Therefore I Am", [artist1], 2.53, ['POP'], true, 567983255, 567983);
let song15 = new Song("Happier Than Ever", [artist1], 4.58, ['SOUL', 'ROCK'], true, 566031384, 566031);
artist1.setSongList([song1, song3, song4, song5, song6, song7, song8, song10, song11, song12, song13, song14, song15]);
let playlist1 = new Playlist("Playlist1", [song1, song3, song4, song5, song6, song7, song8, song10, song11, song12, song13, song14, song15], 45.23, ['POP']);


describe('Pruebas unitarias de la clase Playlist', ()=>{
  it ('Pruebas de instancia de Playlist', ()=>{
    expect(playlist1).to.exist;
  });
  it ('Test de los metodos del grupo numero 1', ()=>{
    expect(playlist1.getName()).to.be.eql('Playlist1');
    expect(playlist1.getSongs()).to.be.eql([song1, song3, song4, song5, song6, song7, song8, song10, song11, song12, song13, song14, song15]);
    expect(playlist1.getGenres()).to.eql(['POP']);
    expect(playlist1.getDuration()).to.be.eql(45.23);
  });
});  