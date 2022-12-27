import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminFormsComponent } from './admins/admin-forms/admin-forms.component';
import { SigninComponent } from './admins/signin/signin.component';
import { AuthService as AuthGuard } from './shared/services/auth.service';
import { HomeComponent } from './home/home.component';
import { ArtisteComponent } from './artiste/artiste.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sign', component: SigninComponent  },
  { path: 'artiste/:artiste', component: ArtisteComponent  },
  { path: 'admin-f', component: AdminFormsComponent, canActivate: [AuthGuard]  },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
