import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Pokemon, PokemonsList } from 'src/app/typings';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent {

  static limit: number = 20;

  pokemons?: Pokemon[];
  previousUrl?: string;
  nextUrl?: string;
  offset: number = 0;
  count: number = 0;
  currentPage: number = 1;
  previousPage: number = 0;
  nextPage: number = 2;
  afterNextPage: number = 3;
  beforePreviousPage: number = 0;

  constructor (private apiService: ApiService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.handlePageParams();
  }

  getPokemons(currentPage: number) {
    this.offset = (currentPage - 1) * 20;

    this.apiService.getPokemonsFromApi(this.offset, PokedexComponent.limit)
    .subscribe(
      (data: PokemonsList) => {
        this.pokemons = data.results;
        this.count = data.count;
      }
    );
  }

  toPage(page: number) {
    this.router.navigate(['/pokedex', page]);
  }

  handlePageParams() {
    this.activatedRoute.params.subscribe((params: Params) => {
      const pageIndexStr = params['page'];
      this.currentPage = parseInt(pageIndexStr);

      this.previousPage = this.currentPage - 1;
      this.beforePreviousPage = this.currentPage - 2;

      this.nextPage = this.currentPage;
      this.nextPage++;

      this.afterNextPage = this.nextPage;
      this.afterNextPage++;

      console.log(this.previousPage);
      this.getPokemons(this.currentPage);
    })
  }

  getNextPokemonsPage() {
    if (this.offset >= (this.count - this.count%20)) {
      this.offset = this.offset;
    } else {
      this.offset += 20;
    }
    this.currentPage = 1 + this.offset / 20
    // this.previousPage = this.currentPage - 1;
    // this.nextPage = this.currentPage + 1;

    this.apiService.getPokemonsFromApi(this.offset, PokedexComponent.limit).subscribe(
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
    // this.previousPage = this.currentPage - 1;
    // this.nextPage = this.currentPage + 1;

    this.apiService.getPokemonsFromApi(this.offset, PokedexComponent.limit).subscribe(
      (data: PokemonsList) => {
        this.pokemons = data.results;
        console.log(this.offset);
      }
    );
  }


}
