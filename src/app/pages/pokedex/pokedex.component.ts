import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Pokemon, PokemonsList } from 'src/app/typings';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent {

  pokemons?: Pokemon[];
  previousUrl?: string;
  nextUrl?: string;
  offset: number = 0;
  limit: number = 20;
  count: number = 0;
  numOfActivePage: number = 1;

  constructor (private apiService: ApiService) {
    this.getPokemons();
  }

  getPokemons() {
    this.apiService.getPokemonsFromApi(this.offset, this.limit).subscribe(
      (data: PokemonsList) => {
        this.pokemons = data.results;
        this.count = data.count;
        console.log(this.offset);
      }
    );
  }

  getNextPokemonsPage() {
    if (this.offset >= (this.count - this.count%20)) {
      this.offset = this.offset;
    } else {
      this.offset += 20;
    }
    this.apiService.getPokemonsFromApi(this.offset, this.limit).subscribe(
      (data: PokemonsList) => {
        this.pokemons = data.results;
        console.log(this.offset);
      }
    );
  }

  getPreviousPokemonsPage() {
    if (this.offset < 20) {
      this.offset = 0;
    } else {
      this.offset -= 20;
    }
    this.apiService.getPokemonsFromApi(this.offset, this.limit).subscribe(
      (data: PokemonsList) => {
        this.pokemons = data.results;
        console.log(this.offset);
      }
    );
  }
}
