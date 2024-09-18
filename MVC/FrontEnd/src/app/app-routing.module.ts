import { EntrenadoresComponent } from './demo/pages/entrenadores/entrenadores.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'entrenadores',
        pathMatch: 'full'
      },
      {
        path: 'entrenadores',
        loadComponent: () => import('./demo/pages/entrenadores/entrenadores.component').then(m => m.EntrenadoresComponent)
      },
      {
        path: 'nuevoentrenador',
        loadComponent: () => import('./demo/pages/entrenadores/nuevo-entrenador/nuevo-entrenador.component').then((m) => m.NuevoEntrenadorComponent)
      },
      {
        path: 'editarentrenador/:entrenadorId',
        loadComponent: () => import('./demo/pages/entrenadores/nuevo-entrenador/nuevo-entrenador.component').then((m) => m.NuevoEntrenadorComponent)
      },
      {
        path: 'miembros',
        loadComponent: () => import('./demo/pages/miembros/miembros.component').then(m => m.MiembrosComponent)
      },
      {
        path: 'nuevomiembro',
        loadComponent: () => import('./demo/pages/miembros/nuevo-miembro/nuevo-miembro.component').then((m) => m.NuevoMiembroComponent)
      },
      {
        path: 'editarmiembro/:miembroId',
        loadComponent: () => import('./demo/pages/miembros/nuevo-miembro/nuevo-miembro.component').then((m) => m.NuevoMiembroComponent)
      },
      {
        path: 'sesiones',
        loadComponent: () => import('./demo/pages/sesiones/sesiones.component').then(m => m.SesionesComponent)
      },
      {
        path: 'nuevasesion',
        loadComponent: () => import('./demo/pages/sesiones/nueva-sesion/nueva-sesion.component').then(m => m.NuevaSesionComponent)
      },
      {
        path: 'editarsesion/:sesionId',
        loadComponent: () => import('./demo/pages/sesiones/nueva-sesion/nueva-sesion.component').then(m => m.NuevaSesionComponent)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
