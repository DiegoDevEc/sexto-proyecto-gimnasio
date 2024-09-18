import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IMiembro } from 'src/app/interfaces/IMiembro';
import { MiembrosService } from 'src/app/services/miembros.service';

import Swal from "sweetalert2";

@Component({
  selector: 'app-miembros',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './miembros.component.html',
  styleUrl: './miembros.component.scss'
})
export class MiembrosComponent {
  miembros = [];

  constructor(private miembrosService: MiembrosService) {}

  ngOnInit(): void {
    this.cargarTabla();
  }

  cargarTabla() {
    this.miembrosService.todos().subscribe((data: IMiembro[]) => {
      this.miembros = data;
    });
  }

  eliminar(miembroId: number) {
    Swal.fire({
      title: "¿Estás seguro de que quieres eliminar?",
      text: "¡No podrás recuperar esta información!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, Eliminar ahora!",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.value) {
        this.miembrosService.eliminar(miembroId).subscribe((data) => {
          Swal.fire("Eliminado!", "La información a sido eliminada", "success");
          this.cargarTabla();
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelado", "La información no fue eliminada :)", "error");
      }
    });
  }

}
