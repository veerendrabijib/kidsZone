import { Routes } from '@angular/router';

export const authRoutes: Routes = [
    {
        path: "", loadComponent: () => import("./login/login.component").then((c) => c.LoginComponent),
    },
    {
        path: "forgot-password", loadComponent: () => import("./forgot-password/forgot-password.component").then((c) => c.ForgotPasswordComponent),
    },
    {
        path: "signup", loadComponent: () => import("./signup/signup.component").then((c) => c.SignupComponent),
    },
];