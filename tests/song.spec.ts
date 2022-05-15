import 'mocha';
import {expect} from 'chai';
import {Song} from '../src/models/song';
import {Artist} from '../src/models/artist';

let artist1 = new Artist("Billie Eillish", ['POP', 'ALTERNATIVO']);
let song1 = new Song("Listen Before I Go", [artist1], 4.03, ['POP'], false, 82368601, 82368);

describe('Tests de la clase Cancion', ()=>{
  it('Test de instancia de los diferentes Canciones', ()=> {
    expect(song1).to.exist;
  });
  it ('Test de los metodos del Cancion numero 1', ()=>{
    expect(song1.getName()).to.be.eql('Listen Before I Go');
    expect(song1.getAutor()).to.be.eql([artist1]);
    expect(song1.getDuration()).to.be.eql(4.03);
    expect(song1.getGenres()).to.be.eql(['POP']);
    expect(song1.getReproducciones()).to.be.eql(82368601);
    expect(song1.getSingle()).to.be.eql(false);
    expect(song1.getListener()).to.be.eql(82368);
  });

});