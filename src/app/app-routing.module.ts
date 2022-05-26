import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { NosArtistesComponent } from './nos-artistes/nos-artistes.component';
import { NosServicesComponent } from './nos-services/nos-services.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'artistes', component: NosArtistesComponent },
  { path: 'services', component: NosServicesComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
