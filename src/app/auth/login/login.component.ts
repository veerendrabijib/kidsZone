import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { Constants } from 'src/app/services/constants';
import { Utils } from 'src/app/services/utils';

/**
 * LoginComponent
 * ──────────────
 * Kid-friendly login form with:
 *  • Username & password validation
 *  • Show/hide password toggle
 *  • Friendly error messages
 *  • Mock authentication (frontend-only)
 *  • Loading animation on submit
 */
@Component({
    selector: 'app-login',
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    changeDetection: ChangeDetectionStrategy.Eager,
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  showPassword = false;
  isLoading = false;
  loginError = false;
  loginSuccess = false;
  selectedCharacter: any = null;

  // ── Demo users (frontend-only, no backend) ──────────────────
  private mockUsers = [
    { username: 'sparkle', password: 'play123' },
    { username: 'buddy', password: 'fun456' },
    { username: 'starkid', password: '1234' }
  ];
  characters = Constants.CHARACTERS;
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(4)
      ]]
    });

    // Clear login error on input change
    this.loginForm.valueChanges.subscribe(() => {
      this.loginError = false;
    });
    this.selectedCharacter = Utils.getLocalStorage(Constants.LS_SELECTED_CHARACTER);
  }

  // ── Getters for template convenience ────────────────────────
  get username() { return this.loginForm.get('username')!; }
  get password() { return this.loginForm.get('password')!; }

  // ── Toggle show/hide password ────────────────────────────────
  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  // ── Submit handler ───────────────────────────────────────────
  onLogin(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.loginError = false;

    // Simulate network delay
    setTimeout(() => {
      const { username, password } = this.loginForm.value;
      const found = this.mockUsers.find(
        u => u.username.toLowerCase() === username.toLowerCase()
          && u.password === password
      );

      this.isLoading = false;

      if (found) {
        this.loginSuccess = true;
        // In a real app: store token, then navigate to dashboard
        setTimeout(() => {
          alert(`🎉 Yay! Welcome back, ${username}! Let's have fun!`);
          this.loginSuccess = false;
        }, 800);
      } else {
        this.loginError = true;
      }
    }, 1600);
  }
}
