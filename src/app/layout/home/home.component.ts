import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
@Component({
    selector: 'app-home',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.Eager,
    templateUrl: './home.component.html'
})
export class HomeComponent {
    private readonly router = inject(Router)

    name = 'Hasvi';
    gender = "girl";

    onStartLearningClick() {
        // Navigate to the learning page
        this.router.navigate(['/layout/learning']);
    }

    onExploreGamesClick() {
        // Navigate to the games page
        this.router.navigate(['/layout/games']);
    }

    onSpinnerClick() {
        // Navigate to the Spinner page
        this.router.navigate(['/layout/spinner']);
    }

    onSlamBookClick() {
        // Navigate to the slam book page
        this.router.navigate(['/layout/slam']);
    }
}