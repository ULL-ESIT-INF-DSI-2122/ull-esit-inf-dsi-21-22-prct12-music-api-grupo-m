import 'mocha';
import {expect} from 'chai';
import {Song} from '../src/models/song';


let song1 = new Song("Listen Before I Go", ['Billie Eillish'], 4.03, ['POP'], false, 82368601, 99512);
let song2 = new Song("In the End", ['Likin Park'], 3.36, ['ROCK'], false, 654122, 22358);
let song3 = new Song("Inmortal", ['J Cole'], 3.21, ['RAP', 'HIP-HOP'], true, 399964, 82368);

describe('Tests de la clase Cancion', ()=>{
  it('Test de instancia de diferentes Canciones', ()=> {
    expect(song1).to.exist;
    expect(song2).to.exist;
    expect(song3).to.exist;
  });

  it('Test de los metodos de la Cancion numero 1', ()=>{
    expect(song1.getName()).to.be.eql('Listen Before I Go');
    expect(song1.getAutor()).to.be.eql(['Billie Eillish']);
    expect(song1.getDuration()).to.be.eql(4.03);
    expect(song1.getGenres()).to.be.eql(['POP']);
    expect(song1.getReproducciones()).to.be.eql(82368601);
    expect(song1.getSingle()).to.be.eql(false);
    expect(song1.getListener()).to.be.eql(99512);
  });
  it('Test de los metodos de la Cancion numero 2', ()=>{
    expect(song2.getName()).to.be.eql('In the End');
    expect(song2.getAutor()).to.be.eql(['Likin Park']);
    expect(song2.getDuration()).to.be.eql(3.36);
    expect(song2.getGenres()).to.be.eql(['ROCK']);
    expect(song2.getReproducciones()).to.be.eql(654122);
    expect(song2.getSingle()).to.be.eql(false);
    expect(song2.getListener()).to.be.eql(22358);
  });
  it('Test de los metodos de la Cancion numero 3', ()=>{
    expect(song3.getName()).to.be.eql('Inmortal');
    expect(song3.getAutor()).to.be.eql(['J Cole']);
    expect(song3.getDuration()).to.be.eql(3.21);
    expect(song3.getGenres()).to.be.eql(['RAP', 'HIP-HOP']);
    expect(song3.getReproducciones()).to.be.eql(399964);
    expect(song3.getSingle()).to.be.eql(true);
    expect(song3.getListener()).to.be.eql(82368);
  });
});

