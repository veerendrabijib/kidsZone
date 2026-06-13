import { Service } from '@angular/core';

@Service()
export class Constants {
  static readonly CHARACTERS = [
  { id: 1, name: "Dino", path: "assets/sprites/characters/dino.png" },
  { id: 2, name: "Unicorn", path: "assets/sprites/characters/unicorn.png" },
  { id: 3, name: "Robo", path: "assets/sprites/characters/robo.png" },
  { id: 4, name: "Lion", path: "assets/sprites/characters/lion.png" },
 ]

 // localStorage keys
 static readonly LS_SELECTED_CHARACTER = 'selectedCharacter';
}
