import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private apiUrl = "https://pokedex-c8855-default-rtdb.europe-west1.firebasedatabase.app";
  constructor(private http: HttpClient) { }

  postPokemon(currentPokemonName: string){
    return this.http.post(`${this.apiUrl}/pokemons.json`, currentPokemonName);
  }

  getPokemonsList(){
    return this.http.get(`${this.apiUrl}/pokemons.json`);
  }
}
