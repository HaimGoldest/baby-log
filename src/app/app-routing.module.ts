import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BabyActionsPreferencesComponent } from './baby-actions/baby-actions-preferences/baby-actions-preferences.component';
import { BabyActionsComponent } from './baby-actions/baby-actions.component';
import { GrowthTrackingComponent } from './growth-tracking/growth-tracking.component';
import { AuthGuardService } from './services/auth.guard.service';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'baby-actions',
    component: BabyActionsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'growth-tracking',
    component: GrowthTrackingComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'baby-actions-preferences',
    component: BabyActionsPreferencesComponent,

    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
