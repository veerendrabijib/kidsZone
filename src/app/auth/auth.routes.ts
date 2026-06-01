import { Routes } from '@angular/router';

export const authRoutes: Routes = [
    {
        path: "", loadComponent: () => import("./login/login.component").then((c) => c.LoginComponent),
    },
    {
        path: "signup", loadComponent: () => import("./signup/signup.component").then((c) => c.SignupComponent),
    },
];