import 'mocha';
import {expect} from 'chai';
import {Artist} from '../src/models/artist';
import {Song} from '../src/models/song';

let artist1 = new Artist("Billie Eillish", ['POP', 'ALTERNATIVO']);
let song1 = new Song("Listen Before I Go", [artist1], 4.03, ['POP'], false, 82368601, 823680);
let song3 = new Song("Billie Bossa Nova", [artist1], 3.16, ['R&B'], false, 87082953, 870820);
let song4 = new Song("my future", [artist1], 3.30, ['R&B'], true, 306917025, 3069170);
let song5 = new Song("Oxytocin", [artist1], 3.30, ['POP'], false, 82436281, 824360);
let song6 = new Song("GOLDWING", [artist1], 2.31, ['POP'], false, 50221104, 502210);
let song7 = new Song("Lost Cause", [artist1], 3.32, ['POP'], true, 181748562, 1817480);
let song8 = new Song("Halley's Comet", [artist1], 3.54, ['POP'], false, 74773544, 747730);
let song10 = new Song("OverHeated", [artist1], 3.34, ['POP'], false, 41873321, 418730);
let song11 = new Song("Everybody Dies", [artist1], 3.26, ['POP'], false, 42128791, 421280);
let song12 = new Song("Your Power", [artist1], 4.05, ['POP'], true, 261975001, 2619750);
let song13 = new Song("NDA", [artist1], 3.15, ['ELECTROPOP', 'ALTERNATIVO'], true, 154235501, 1542350);
let song14 = new Song("Therefore I Am", [artist1], 2.53, ['POP'], true, 567983255, 5679830);
let song15 = new Song("Happier Than Ever", [artist1], 4.58, ['SOUL', 'ROCK'], true, 566031384, 5660310);
artist1.setSongList([song1, song3, song4, song5, song6, song7, song8, song10, song11, song12, song13, song14, song15]);


describe('Tests de la clase Artista', ()=>{
  it('Test de instancia de los diferentes artistas', ()=> {
    expect(artist1).to.exist;
  });

  it('Test de Métodos del artista', ()=> {
    expect(artist1.getName()).to.be.eql('Billie Eillish');
    expect(artist1.getGenre()).to.be.eql(['POP', 'ALTERNATIVO']);
    expect(artist1.getOyentesMensual()).to.eql(24997700);
  });
});