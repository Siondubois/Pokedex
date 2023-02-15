import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { PokemonName, PokemonNameWithId } from '../typings';


@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private apiUrl = "https://pokedex-c8855-default-rtdb.europe-west1.firebasedatabase.app";
  constructor(private http: HttpClient) { }

  postPokemon(pokemon: PokemonName) {
    return this.http.post(`${this.apiUrl}/pokemons.json`, pokemon);
  }

  getPokemonsList() {
    return this.http.get(`${this.apiUrl}/pokemons.json`)
    .pipe(
      map(
        (data) => {
          const pokemons: PokemonNameWithId[] = [];
          Object.entries(data).forEach(([id, name]) => {
            pokemons.push({
              id,
              ...name
            })
          });
          return pokemons;
        }
      )
    );
  }

  deletePokemon(index: number, pokemons: PokemonNameWithId[]) {
    let id = pokemons[index].id;
    return this.http.delete(`${this.apiUrl}/pokemons/${id}.json`);
  }
}
