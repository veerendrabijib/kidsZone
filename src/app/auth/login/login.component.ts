import { Component, OnInit } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

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
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  showPassword = false;
  isLoading    = false;
  loginError   = false;
  loginSuccess = false;

  // ── Demo users (frontend-only, no backend) ──────────────────
  private mockUsers = [
    { username: 'sparkle',  password: 'play123' },
    { username: 'buddy',    password: 'fun456'  },
    { username: 'starkid',  password: '1234'    }
  ];

  constructor(private fb: FormBuilder, private router: Router) {}

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

    this.isLoading  = true;
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
