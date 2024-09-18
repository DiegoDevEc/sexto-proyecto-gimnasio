import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators }  from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';
import { EntrenadoresService } from 'src/app/services/entrenadores.service';
import { IEntrenador } from 'src/app/interfaces/IEntrenador';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-entrenador',
  standalone: true,
  imports: [CardComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './nuevo-entrenador.component.html',
  styleUrl: './nuevo-entrenador.component.scss'
})
export class NuevoEntrenadorComponent implements OnInit{

  especialidades = ["Boxeo", "Yoga", "Pilates", "Crossfit", "Zumba", "Natación", "Ciclismo", "Running", "Pesas" ]

  frm_Entrenador = new FormGroup({
    Nombre: new FormControl('', Validators.required),
    Especialidad: new FormControl('', Validators.required),
    Telefono: new FormControl('', Validators.required),
    Email: new FormControl('', [Validators.required, Validators.email])
  });

  title = "Nuevo Entrenador";
  entrenadorId = 0;

  constructor(private entrenadorService: EntrenadoresService, private routes: ActivatedRoute, private navegation: Router){

  }
  ngOnInit(): void {
    this.entrenadorId = parseInt(this.routes.snapshot.paramMap.get('entrenadorId'));
    if(this.entrenadorId > 0){
      this.title = "Editar Entrenador";
      this.entrenadorService.uno(this.entrenadorId).subscribe((entrenador) => {
        console.log(entrenador.especialidad);
        console.log(this.especialidades.filter(item => item === entrenador.especialidad));
        
        
        this.frm_Entrenador.patchValue({
          Nombre: entrenador.nombre,
          Especialidad: entrenador.especialidad.trim(),
          Telefono: entrenador.telefono,
          Email: entrenador.email
        });
      });
    }
  }

  grabar(){
    console.log(this.frm_Entrenador.value);

    let entrenador: IEntrenador = {
      entrenador_id : this.entrenadorId,
      nombre: this.frm_Entrenador.controls['Nombre'].value,
      especialidad: this.frm_Entrenador.controls['Especialidad'].value,
      telefono: this.frm_Entrenador.controls['Telefono'].value,
      email: this.frm_Entrenador.controls['Email'].value,
    }
    

    Swal.fire({
      title: 'Entrenadores',
      text: 'Desea gurdar al Entrenador ' + this.frm_Entrenador.controls['Nombre'].value,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f00',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Grabar!'
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.entrenadorId > 0) {
          this.entrenadorService.actualizar(entrenador).subscribe((res: any) => {
            Swal.fire({
              title: 'Entrenadores',
              text: res.mensaje,
              icon: 'success'
            });
            this.navegation.navigate(['/entrenadores']);
          });
        } else {
          this.entrenadorService.insertar(entrenador).subscribe((res: any) => {
            Swal.fire({
              title: 'Entrenadores',
              text: res.mensaje,
              icon: 'success'
            });
            this.navegation.navigate(['/entrenadores']);
          });
        }
      }
    });


  
  }

}



