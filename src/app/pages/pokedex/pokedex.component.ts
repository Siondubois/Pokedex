import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  currentPage: number = 1;
  previousPage: number = 0;
  nextPage: number = 2;

  constructor (private apiService: ApiService, private activatedRoute: ActivatedRoute) {
    this.currentPage = this.activatedRoute.snapshot.params['page'];
    //this.offset = 
    this.getPokemons();
  }

  getPokemons() {
    this.currentPage = 1 + this.offset / 20
    this.previousPage = this.currentPage - 1;
    this.nextPage = this.currentPage + 1;
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
    this.currentPage = 1 + this.offset / 20
    this.previousPage = this.currentPage - 1;
    this.nextPage = this.currentPage + 1;

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
    this.currentPage = 1 + this.offset / 20
    this.previousPage = this.currentPage - 1;
    this.nextPage = this.currentPage + 1;

    this.apiService.getPokemonsFromApi(this.offset, this.limit).subscribe(
      (data: PokemonsList) => {
        this.pokemons = data.results;
        console.log(this.offset);
      }
    );
  }
}
