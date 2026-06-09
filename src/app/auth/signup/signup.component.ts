import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
    selector: 'app-signup',
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;

  // ── UI state ────────────────────────────────────────────────
  currentStep = 1;
  readonly STEPS = 2;
  showPassword = false;
  showConfirmPw = false;
  isLoading = false;
  signupSuccess = false;
  sliderBackground = '';

  // ── Selection state ─────────────────────────────────────────
  selectedAvatar = '🦁';
  selectedColor = '#FF6B6B';
  selectedGender = '';

  // ── Data lists ──────────────────────────────────────────────
  readonly avatars = [
    '🦁', '🐱', '🦊', '🐶',
    '🐻', '🐼', '🐨', '🦋',
    '🐸', '🦄', '🐯', '🐰',
  ];

  readonly colors = [
    { hex: '#FF6B6B', label: 'Red' },
    { hex: '#FFE566', label: 'Yellow' },
    { hex: '#6BCB77', label: 'Green' },
    { hex: '#74B9FF', label: 'Blue' },
    { hex: '#B39DDB', label: 'Purple' },
    { hex: '#FF6B9D', label: 'Pink' },
    { hex: '#FF9A3C', label: 'Orange' },
    { hex: '#4ECDC4', label: 'Teal' },
  ];

  readonly cartoons = [
    'SpongeBob 🧽',
    'Peppa Pig 🐷',
    'Paw Patrol 🐾',
    'Bluey 🐕',
    'Minions 💛',
    'Frozen ❄️',
    'Spider-Man 🕷️',
    'Other ⭐'
  ];

  readonly genders = [
    { value: 'Boy', label: 'Boy', emoji: '💙' },
    { value: 'Girl', label: 'Girl', emoji: '💗' },
    { value: 'SuperKid', label: 'Super Kid', emoji: '⭐' },
  ];

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group(
      
      {
        // Step 1
        fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]],
        nickName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
        age: [7, [Validators.required, Validators.min(3), Validators.max(12)]],
        gender: ['', Validators.required],

        // Step 2
        password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
        confirmPassword: ['', Validators.required],
        favoriteCartoon: ['']
      },
      // { validators: this.passwordsMatch }
    );
    this.updateSliderFill();
  }

  updateSliderFill(event?: Event): void {
    const min = 3;
    const max = 12;
    const val = event
      ? +(event.target as HTMLInputElement).value
      : +(this.age?.value ?? 7);
    const pct = ((val - min) / (max - min)) * 100;
    this.sliderBackground = `linear-gradient(to right, #1D9E75 0%, #1D9E75 ${pct}%, #d0f0e8 ${pct}%, #d0f0e8 100%)`;
  }

  // ── Custom validator: passwords must match ──────────────────
  passwordsMatch(group: AbstractControl): ValidationErrors | null {
    const pw = group.get('password')?.value;
    const cpw = group.get('confirmPassword')?.value;
    if (cpw && pw !== cpw) {
      group.get('confirmPassword')?.setErrors({ mismatch: true });
      return { mismatch: true };
    }
    // Clear mismatch error if they now match
    if (group.get('confirmPassword')?.hasError('mismatch')) {
      group.get('confirmPassword')?.setErrors(null);
    }
    return null;
  }

  // ── Getters ─────────────────────────────────────────────────
  get fullName() { return this.signupForm.get('fullName')!; }
  get nickName() { return this.signupForm.get('nickName')!; }
  get age() { return this.signupForm.get('age')!; }
  get gender() { return this.signupForm.get('gender')!; }
  get password() { return this.signupForm.get('password')!; }
  get confirmPassword() { return this.signupForm.get('confirmPassword')!; }

  get ageLabel(): string {
    return `${this.age.value} year${this.age.value === 1 ? '' : 's'} old`;
  }

  // ── Step navigation ─────────────────────────────────────────
  nextStep(): void {
    // Validate step 1 fields before advancing
    ['fullName', 'nickName', 'age', 'gender'].forEach(f =>
      this.signupForm.get(f)?.markAsTouched()
    );
    const step1Valid =
      this.fullName.valid &&
      this.nickName.valid &&
      this.age.valid &&
      this.gender.valid;

    if (step1Valid) {
      this.currentStep = 2;
      // Scroll card back to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  prevStep(): void {
    this.currentStep = 1;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ── Selection handlers ───────────────────────────────────────
  selectGender(value: string): void {
    this.selectedGender = value;
    this.signupForm.patchValue({ gender: value });
  }

  selectAvatar(emoji: string): void {
    this.selectedAvatar = emoji;
  }

  selectColor(hex: string): void {
    this.selectedColor = hex;
  }

  // ── Submit ──────────────────────────────────────────────────
  onSignup(): void {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const profile = {
      ...this.signupForm.value,
      avatar: this.selectedAvatar,
      favoriteColor: this.selectedColor,
    };

    // Simulate async save
    setTimeout(() => {
      this.isLoading = false;
      this.signupSuccess = true;

      setTimeout(() => {
        alert(`🎉 Welcome to Sparkle Squad, ${profile.nickName}! Your adventure starts NOW!`);
        this.router.navigate(['/login']);
      }, 1000);
    }, 2000);
  }
}
