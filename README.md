# KidsZone — Kids Login & Registration App

A magical, colorful Angular authentication module designed for children aged 3–12.
Built to feel like **Duolingo Kids** meets **ABCmouse** — fun, safe, and exciting!

---

## 🌟 Features

| Feature | Details |
|---|---|
| 🎮 Login Page | Username + password with show/hide toggle |
| 🦉 Forgot Password | Kid-friendly reset flow with Professor Owl |
| 🚀 2-Step Signup | Name, age slider, gender, avatar, colour picker |
| 🎨 Beautiful UI | Rainbow gradients, floating clouds, twinkling stars |
| 📱 Fully Responsive | Mobile, tablet & desktop |
| ✅ Angular Reactive Forms | Proper validation with friendly error messages |
| 🎭 Avatar Selection | 12 cute emoji avatars |
| 🌈 Colour Picker | 8 favourite colour swatches |
| 📺 Cartoon Picker | Dropdown of popular kids shows |
| ⚡ Animations | Bounce, wiggle, shimmer, pop-in and more |

---

## 📂 Folder Structure

```
sparkle-squad/
├── src/
│   ├── app/
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   │   ├── login.component.ts       ← TypeScript logic
│   │   │   │   ├── login.component.html     ← Template
│   │   │   │   └── login.component.css      ← Styles
│   │   │   ├── forgot-password/
│   │   │   │   ├── forgot-password.component.ts
│   │   │   │   ├── forgot-password.component.html
│   │   │   │   └── forgot-password.component.css
│   │   │   └── signup/
│   │   │       ├── signup.component.ts
│   │   │       ├── signup.component.html
│   │   │       └── signup.component.css
│   │   ├── app.component.ts                 ← Root shell
│   │   ├── app.component.html               ← Floating background
│   │   ├── app.component.css                ← Bubbles & rainbow arc
│   │   ├── app.routes.ts                    ← Routing config
│   │   └── app.config.ts                    ← App providers
│   ├── styles.css                           ← Global design system
│   ├── main.ts                              ← Bootstrap entry
│   └── index.html                           ← Root HTML
├── angular.json
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18 or newer
- **Angular CLI** v17+

```bash
# Install Angular CLI globally (if not already installed)
npm install -g @angular/cli
```

### Installation

```bash
# 1. Navigate to the project folder
cd sparkle-squad

# 2. Install dependencies
npm install

# 3. Start the development server
ng serve

# 4. Open your browser
# → http://localhost:4200
```

---

## 🎯 Routes

| URL | Component | Description |
|---|---|---|
| `/login` | `LoginComponent` | Main login screen 🦁 |
| `/forgot-password` | `ForgotPasswordComponent` | Password help 🦉 |
| `/signup` | `SignupComponent` | New account creation 🦄 |

---

## 🔐 Demo Credentials (Frontend Only)

| Username | Password |
|---|---|
| `sparkle` | `play123` |
| `buddy` | `fun456` |
| `starkid` | `1234` |

---

## 🎨 Design System

### Fonts
- **Fredoka One** — Display headings (playful, rounded)
- **Nunito** — Body text (friendly, readable)

### Colors
| Name | Hex | Usage |
|---|---|---|
| Sky Blue | `#74D7F7` | Background top |
| Teal | `#4ECDC4` | Primary accent |
| Orange | `#FF9A3C` | Primary button |
| Coral | `#FF6B6B` | Errors, accents |
| Yellow | `#FFE566` | Stars, badges |
| Green | `#6BCB77` | Success, signup button |

### Animations
- `bounce-fun` — Mascot characters
- `wiggle` — Side animals
- `drift-cloud` — Moving clouds
- `twinkle` — Stars
- `shimmer` — Button sheen
- `pop-in` — Card entrance
- `shake` — Error feedback
- `loading-dot` — Submit button loader

---

## 📱 Responsive Breakpoints

| Breakpoint | Target |
|---|---|
| `< 360px` | Very small phones |
| `< 480px` | Small phones |
| `< 768px` | Tablets (portrait) |
| `≥ 768px` | Tablets (landscape) + Desktop |

---

## 🛡️ Validation Rules

| Field | Rules |
|---|---|
| Username | Required, min 3 chars, max 20 chars |
| Password | Required, min 4 chars, max 30 chars |
| Full Name | Required, min 2 chars |
| Nick Name | Required, min 2 chars |
| Age | Required, 3–12 years |
| Gender | Required selection |
| Confirm Password | Must match password |

---

## 🌈 Kid-Friendly UX Decisions

- **Large touch targets** — All buttons ≥ 48px height
- **Friendly error messages** — "Oops! Please type your fun name 😊" not "Required"
- **Show/hide password** — 👁️ / 🙈 toggles
- **Progress bar** — Kids know where they are in signup
- **Avatar selection** — Visual, emoji-based, no text required
- **Colour swatches** — Visual colour picker (not hex input!)
- **Age slider** — Easier than typing for young kids
- **Parent help hints** — Safety tips built into the UI
- **Loading animations** — Fun dots instead of spinners

---

Made with ❤️ for little explorers everywhere 🌍
