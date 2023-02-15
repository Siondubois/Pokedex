import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  currentPokemonName='';
  tablepokemon:any = [];

  constructor(private databseService: DatabaseService) {
    
  }



  addPokemon(){
    console.log(this.currentPokemonName)
    this.databseService.postPokemon(this.currentPokemonName).subscribe(
      (data)=>{
        console.log(data);
      }
    );
  }
}
