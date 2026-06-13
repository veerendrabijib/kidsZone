import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from '../services/constants';
import { Utils } from '../services/utils';

@Component({
 selector: 'app-splash',
 imports: [],
 changeDetection: ChangeDetectionStrategy.Eager,
 templateUrl: './splash.component.html'
})
export class SplashComponent {
 private readonly router = inject(Router);   
 characters: any = Constants.CHARACTERS;
 selectedCharacter: any;
 onChangeRoute(character: string) {
  this.selectedCharacter = character;
  Utils.setLocalStorage(Constants.LS_SELECTED_CHARACTER, character);
  this.router.navigate(['/login']);
 }
}
