import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PokemonsList } from '../typings';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private pokeApiUrl = 'https://pokeapi.co/api/v2/pokemon';
  constructor(private http: HttpClient) { }

  getPokemonsFromApi(offset: number, limit: number): Observable<PokemonsList> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("offset", offset);
    queryParams = queryParams.append("limit", limit);

    return this.http
    .get<PokemonsList>(`${this.pokeApiUrl}`, {params: queryParams});
  }

  getPokemonsByUrl(url: string): Observable<PokemonsList> {
    return this.http.get<PokemonsList>(url);
  }
}
