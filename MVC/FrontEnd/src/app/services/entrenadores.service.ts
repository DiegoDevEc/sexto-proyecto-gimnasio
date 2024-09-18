import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEntrenador } from '../interfaces/IEntrenador';

@Injectable({
  providedIn: 'root'
})
export class EntrenadoresService {
  apiurl = 'http://localhost/proyecto-gimnasio-sexto/MVC/controllers/entrenadores.controller.php?op=';
  
  constructor(private http: HttpClient) {}

  todos(): Observable<IEntrenador[]> {
    return this.http.get<IEntrenador[]>(this.apiurl + 'todos');
  }
  uno(entrenadorId: number): Observable<IEntrenador> {
    const formData = new FormData();
    formData.append('entrenadorId', entrenadorId.toString());
    return this.http.post<IEntrenador>(this.apiurl + 'uno', formData);
  }

  eliminar(entrenadorId: number): Observable<number> {
    const formData = new FormData();
    formData.append('entrenadorId', entrenadorId.toString());
    return this.http.post<number>(this.apiurl + 'eliminar', formData);
  }
  insertar(entrenador: IEntrenador): Observable<string> {
    const formData = new FormData();
    formData.append('nombre', entrenador.nombre);
    formData.append('especialidad', entrenador.especialidad);
    formData.append('telefono', entrenador.telefono);
    formData.append('email', entrenador.email);
    return this.http.post<string>(this.apiurl + 'insertar', formData);
  }
  actualizar(entrenador: IEntrenador): Observable<string> {
    const formData = new FormData();
    formData.append('entrenadorId', entrenador.entrenador_id.toString());
    formData.append('nombre', entrenador.nombre);
    formData.append('especialidad', entrenador.especialidad);
    formData.append('telefono', entrenador.telefono);
    formData.append('email', entrenador.email);
    return this.http.post<string>(this.apiurl + 'actualizar', formData);
  }

}
