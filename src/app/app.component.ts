import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * AppComponent — Root shell
 * Renders floating background decorations + the router outlet.
 */
@Component({
 selector: 'app-root',
 imports: [RouterOutlet],
 templateUrl: './app.component.html'
})
export class AppComponent {
}
