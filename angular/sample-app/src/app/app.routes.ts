import { Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { RegisterComponent } from './register/register/register.component';

export const routes: Routes = [
  { path: 'contact', component: ContactComponent },
  { path: 'register', component: RegisterComponent },
];
