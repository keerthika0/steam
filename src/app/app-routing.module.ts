import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from 'src/app/components/landing/landing.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./components/components.module').then(
        (mod) => mod.ComponentsModule
      ),
  },
  {
    path:'landing',
    component:LandingComponent,
    pathMatch:'full'
  },
  {
    path:'**',
    redirectTo:"landing"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
