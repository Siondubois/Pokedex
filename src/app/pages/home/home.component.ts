import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';
import { Pokemon, PokemonName } from 'src/app/typings';

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

  constructor(private databaseService: DatabaseService) {}

  addPokemon(){

    this.pokemon.name = this.currentPokemonName;

    this.databaseService.postPokemon(this.pokemon).subscribe(
      (data)=>{
        console.log(data);
      }
    );
  }
}
