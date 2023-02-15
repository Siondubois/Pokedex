import { Component } from '@angular/core';
import { concatMap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';
import { Pokemon, PokemonName, PokemonNameWithId } from 'src/app/typings';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {
  currentPokemonName='';
  pokemon: PokemonName = {
    name: '',
  };
  pokemons: PokemonNameWithId[] = [];

  constructor(private databaseService: DatabaseService) {
    this.getPokemonsList();
  }

  addPokemon(){

    this.pokemon.name = this.currentPokemonName;

    this.databaseService.postPokemon(this.pokemon)
    .pipe(
      concatMap(
        () => {
          return this.databaseService.getPokemonsList();
        }
      )
    )
    .subscribe((pokemons) => {
      this.pokemons = pokemons;
    });
  }

  getPokemonsList() {
    this.databaseService.getPokemonsList()
    .subscribe((pokemons) => {
      this.pokemons = pokemons;
    });
  }

  deletePokemon(index: number) {
    this.databaseService.deletePokemon(index, this.pokemons)
    .pipe(
      concatMap(
        () => {
          return this.databaseService.getPokemonsList();
        }
      )
    )
    .subscribe((pokemons) => {
      this.pokemons = pokemons;
    });
  }
}
