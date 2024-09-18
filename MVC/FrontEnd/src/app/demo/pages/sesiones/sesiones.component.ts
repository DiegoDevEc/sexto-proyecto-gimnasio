import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ISesion } from 'src/app/interfaces/ISesion';
import { PdfService } from 'src/app/services/pdf.service';
import { SesionesService } from 'src/app/services/sesiones.service';

import Swal from "sweetalert2";

@Component({
  selector: 'app-sesiones',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sesiones.component.html',
  styleUrl: './sesiones.component.scss'
})
export class SesionesComponent {
  sesiones: ISesion[] = [];

  constructor(private sesionesService: SesionesService, private pdfServide: PdfService) {}

  ngOnInit(): void {
    this.cargarTabla();
  }

  cargarTabla() {
    this.sesionesService.todos().subscribe((data: ISesion[]) => {
      this.sesiones = data;
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
        this.sesionesService.eliminar(miembroId).subscribe((data) => {
          Swal.fire("Eliminado!", "La información a sido eliminada", "success");
          this.cargarTabla();
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelado", "La información no fue eliminada :)", "error");
      }
    });
  }

  generarPdf(sesion: ISesion){
    this.pdfServide.generatePdf(sesion);
  }
  generarPdfSesiones(){
    this.pdfServide.generatePdfSesiones(this.sesiones);
  }

}
