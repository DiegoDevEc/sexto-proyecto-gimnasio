import { Router, RouterLink } from "@angular/router";
import { EntrenadoresService } from "./../../../services/entrenadores.service";
import { Component, OnInit } from "@angular/core";
import { IEntrenador } from "src/app/interfaces/IEntrenador";
import { SharedModule } from "src/app/theme/shared/shared.module";

import Swal from "sweetalert2";

@Component({
  selector: "app-entrenadores",
  standalone: true,
  imports: [SharedModule, RouterLink],
  templateUrl: "./entrenadores.component.html",
  styleUrl: "./entrenadores.component.scss",
})
export class EntrenadoresComponent implements OnInit {
  entrenadores = [];

  constructor(private entrenadoresService: EntrenadoresService) {}

  ngOnInit(): void {
    this.cargarTabla();
  }

  cargarTabla() {
    this.entrenadoresService.todos().subscribe((data: IEntrenador[]) => {
      this.entrenadores = data;
    });
  }

  eliminar(entrenadorId: number) {
    Swal.fire({
      title: "¿Estás seguro de que quieres eliminar?",
      text: "¡No podrás recuperar esta información!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, Eliminar ahora!",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.value) {
        this.entrenadoresService.eliminar(entrenadorId).subscribe((data) => {
          Swal.fire("Eliminado!", "La información a sido eliminada", "success");
          this.cargarTabla();
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelado", "La información no fue eliominada :)", "error");
      }
    });
  }
}
