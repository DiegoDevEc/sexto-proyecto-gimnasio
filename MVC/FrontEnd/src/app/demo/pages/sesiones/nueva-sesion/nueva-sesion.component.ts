import { SesionesService } from './../../../../services/sesiones.service';
import { EntrenadoresService } from 'src/app/services/entrenadores.service';
import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import Swal from 'sweetalert2';
import { MiembrosService } from 'src/app/services/miembros.service';
import { ISesion } from 'src/app/interfaces/ISesion';
import { IEntrenador } from 'src/app/interfaces/IEntrenador';
import { IMiembro } from 'src/app/interfaces/IMiembro';
import { forkJoin, of } from 'rxjs';

@Component({
  selector: 'app-nueva-sesion',
  standalone: true,
  imports: [CardComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './nueva-sesion.component.html',
  styleUrl: './nueva-sesion.component.scss'
})
export class NuevaSesionComponent implements OnInit {

  entrenadores = [];
  miembros = [];
  horasInicio = [ "08:00:00", "09:00:00","10:00:00", "11:00:00","12:00:00","13:00:00","14:00:00","15:00:00","16:00:00","17:00:00","18:00:00","19:00:00"];
  horasFinal = [ "08:00:00", "09:00:00","10:00:00", "11:00:00","12:00:00","13:00:00","14:00:00","15:00:00","16:00:00","17:00:00","18:00:00","19:00:00"];

  frm_Sesion = new FormGroup({
    MiembroId: new FormControl("", Validators.required),
    EntrenadorId: new FormControl("", Validators.required),
    Fecha: new FormControl("", Validators.required),
    HoraInicio: new FormControl("", Validators.required),
    HoraFin: new FormControl("", Validators.required),
  });

  title = "Nueva Sesion de Entrenamiento";
  sesionId = 0;

  constructor(
    private miembrosService: MiembrosService,
    private entrenadoresService: EntrenadoresService,
    private sesionesService: SesionesService,
    private routes: ActivatedRoute,
    private navegation: Router
  ) {}
  ngOnInit(): void {
    this.sesionId = parseInt(this.routes.snapshot.paramMap.get("sesionId"));
    // Cargar entrenadores y miembros antes de editar la sesión
    const sesionObservable = this.sesionId > 0 
      ? this.sesionesService.uno(this.sesionId) 
      : of(null);  // Usar 'of(null)' en lugar de null
  
    forkJoin({
      entrenadores: this.entrenadoresService.todos(),
      miembros: this.miembrosService.todos(),
      sesion: sesionObservable
    }).subscribe(({ entrenadores, miembros, sesion }) => {
      this.entrenadores = entrenadores;
      this.miembros = miembros;
  
      console.log('sesion');
      console.log(sesion);
      
      // Si estamos editando una sesión, rellenar los valores
      if (sesion) {
        this.title = "Editar Sesión de Entrenamiento";
        this.frm_Sesion.patchValue({
          MiembroId: sesion.miembroId.toString(),
          EntrenadorId: sesion.entrenadorId.toString(),
          Fecha: sesion.fecha,
          HoraInicio: sesion.hora_inicio,
          HoraFin: sesion.hora_fin
        });
      }
    });
  }

  grabar() {
    console.log(this.frm_Sesion.value);

    let sesion: ISesion = {
      sesion_id: this.sesionId,
      fecha: this.frm_Sesion.controls["Fecha"].value,
      hora_inicio: this.frm_Sesion.controls["HoraInicio"].value,
      hora_fin: this.frm_Sesion.controls["HoraFin"].value,
      miembroId: Number(this.frm_Sesion.controls["MiembroId"].value),
      entrenadorId: Number(this.frm_Sesion.controls["EntrenadorId"].value)
    };

    Swal.fire({
      title: "Sesiones",
      text:
        "Desea gurdar la Sesion de Entrenamiento para la fecha: " +
        this.frm_Sesion.controls["Fecha"].value,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f00",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Grabar!",
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.sesionId > 0) {
          this.sesionesService.actualizar(sesion).subscribe((res: any) => {
            Swal.fire({
              title: "Sesiones de Entrenamiento",
              text: res.mensaje,
              icon: "success",
            });
            this.navegation.navigate(["/sesiones"]);
          });
        } else {
          this.sesionesService.insertar(sesion).subscribe((res: any) => {
            Swal.fire({
              title: "Sesiones de Entrenamiento",
              text: res.mensaje,
              icon: "success",
            });
            this.navegation.navigate(["/sesiones"]);
          });
        }
      }
    });
  }

}
