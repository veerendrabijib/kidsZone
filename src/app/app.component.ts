import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * AppComponent — Root shell
 * Renders floating background decorations + the router outlet.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Sparkle Squad ✨';
}
