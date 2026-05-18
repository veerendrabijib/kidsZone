import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

/**
 * ForgotPasswordComponent
 * ───────────────────────
 * Kid-friendly password-help screen.
 * Shows a friendly owl mascot and asks for the username.
 * After "submission" it shows a success message and redirects.
 */
@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotForm!: FormGroup;

  isLoading      = false;
  showSuccess    = false;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.forgotForm = this.fb.group({
      username: ['', [
        Validators.required,
        Validators.minLength(3)
      ]]
    });
  }

  // ── Getter ─────────────────────────────────────────────────
  get username() { return this.forgotForm.get('username')!; }

  // ── Submit ──────────────────────────────────────────────────
  onReset(): void {
    if (this.forgotForm.invalid) {
      this.forgotForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    // Simulate sending a reset link
    setTimeout(() => {
      this.isLoading   = false;
      this.showSuccess = true;

      // Redirect back to login after 3 seconds
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 3000);
    }, 1800);
  }

  goBack(): void {
    this.router.navigate(['/login']);
  }
}
