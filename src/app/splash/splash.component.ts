import { Component } from '@angular/core';

@Component({
 selector: 'app-splash',
 standalone: true,
 imports: [],
 templateUrl: './splash.component.html'
})
export class SplashComponent {


 characters: any = [
  { id: 1, name: "Dino", path: "assets/sprites/characters/dino.png" },
  { id: 2, name: "Unicorn", path: "assets/sprites/characters/unicorn.png" },
  { id: 3, name: "Robo", path: "assets/sprites/characters/robo.png" },
  { id: 4, name: "Lion", path: "assets/sprites/characters/lion.png" },
 ]
}
