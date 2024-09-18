import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { CardComponent } from "src/app/theme/shared/components/card/card.component";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";

import Swal from "sweetalert2";
import { MiembrosService } from "src/app/services/miembros.service";
import { IMiembro } from "src/app/interfaces/IMiembro";

@Component({
  selector: "app-nuevo-miembro",
  standalone: true,
  imports: [CardComponent, ReactiveFormsModule, RouterLink],
  templateUrl: "./nuevo-miembro.component.html",
  styleUrl: "./nuevo-miembro.component.scss",
})
export class NuevoMiembroComponent implements OnInit {
  tipoMembresias = ["Premium", "Básica", "Estándar"];

  frm_Miembro = new FormGroup({
    Nombre: new FormControl("", Validators.required),
    Apellido: new FormControl("", Validators.required),
    FechaNacimiento: new FormControl("", Validators.required),
    TipoMembresia: new FormControl("", Validators.required),
  });

  title = "Nuevo Miembro";
  miembroId = 0;

  constructor(
    private miembrosService: MiembrosService,
    private routes: ActivatedRoute,
    private navegation: Router
  ) {}
  ngOnInit(): void {
    this.miembroId = parseInt(this.routes.snapshot.paramMap.get("miembroId"));
    if (this.miembroId > 0) {
      this.title = "Editar Miembro";
      this.miembrosService.uno(this.miembroId).subscribe((miembro) => {
        this.frm_Miembro.patchValue({
          Nombre: miembro.nombre,
          Apellido: miembro.apellido,
          FechaNacimiento: miembro.fecha_nacimiento,
          TipoMembresia: miembro.tipo_membresia,
        });
      });
    }
  }

  grabar() {
    console.log(this.frm_Miembro.value);

    let miembro: IMiembro = {
      miembro_id: this.miembroId,
      nombre: this.frm_Miembro.controls["Nombre"].value,
      apellido: this.frm_Miembro.controls["Apellido"].value,
      fecha_nacimiento: this.frm_Miembro.controls["FechaNacimiento"].value,
      tipo_membresia: this.frm_Miembro.controls["TipoMembresia"].value,
    };

    Swal.fire({
      title: "Entrenadores",
      text:
        "Desea gurdar al Entrenador " +
        this.frm_Miembro.controls["Nombre"].value,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f00",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Grabar!",
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.miembroId > 0) {
          this.miembrosService.actualizar(miembro).subscribe((res: any) => {
            Swal.fire({
              title: "Miembros",
              text: res.mensaje,
              icon: "success",
            });
            this.navegation.navigate(["/miembros"]);
          });
        } else {
          this.miembrosService.insertar(miembro).subscribe((res: any) => {
            Swal.fire({
              title: "Miembros",
              text: res.mensaje,
              icon: "success",
            });
            this.navegation.navigate(["/miembros"]);
          });
        }
      }
    });
  }
}
