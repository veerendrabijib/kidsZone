import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-spinner',
    imports: [CommonModule],
    templateUrl: './spinner.component.html'
})
export class SpinnerComponent {
 rotation = 0;
 spinning = false;
 selectedAnimal = '';

 animals = [
  { name: 'Lion', img: 'assets/animals/lion.png', color: '#facc15' },
  { name: 'Elephant', img: 'assets/animals/elephant.png', color: '#ec4899' },
  { name: 'Monkey', img: 'assets/animals/monkey.png', color: '#22c55e' },
  { name: 'Tiger', img: 'assets/animals/tiger.png', color: '#a855f7' },
  { name: 'Rabbit', img: 'assets/animals/rabbit.png', color: '#3b82f6' },
  { name: 'Bear', img: 'assets/animals/bear.png', color: '#f97316' },
  { name: 'Panda', img: 'assets/animals/panda.png', color: '#14b8a6' },
  { name: 'Cat', img: 'assets/animals/cat.png', color: '#eab308' }
 ];

 spin() {
  if (this.spinning) return;
  this.spinning = true;
  const randomIndex = Math.floor(Math.random() * this.animals.length);
  const segmentAngle = 360 / this.animals.length;
  const stopAngle = 360 * 6 + (360 - randomIndex * segmentAngle);
  this.rotation += stopAngle;
  setTimeout(() => {
   this.selectedAnimal = this.animals[randomIndex].name;
   console.log(this.selectedAnimal)
   this.spinning = false;
  }, 5000);
 }
}