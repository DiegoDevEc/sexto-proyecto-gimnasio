import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISesion } from '../interfaces/ISesion';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SesionesService {
  apiurl = 'http://localhost/proyecto-gimnasio-sexto/MVC/controllers/sesiones.controller.php?op=';
  
  constructor(private http: HttpClient) {}

  todos(): Observable<ISesion[]> {
    return this.http.get<ISesion[]>(this.apiurl + 'todos');
  }
  uno(sesionId: number): Observable<ISesion> {
    const formData = new FormData();
    formData.append('sesionId', sesionId.toString());
    return this.http.post<ISesion>(this.apiurl + 'uno', formData);
  }

  eliminar(sesionId: number): Observable<number> {
    const formData = new FormData();
    formData.append('sesionId', sesionId.toString());
    return this.http.post<number>(this.apiurl + 'eliminar', formData);
  }
  insertar(sesion: ISesion): Observable<string> {
    const formData = new FormData();
    formData.append('fecha', sesion.fecha);
    formData.append('horaInicio', sesion.hora_inicio);
    formData.append('horaFin', sesion.hora_fin);
    formData.append('miembroId', sesion.miembroId.toString());
    formData.append('entrenadorId', sesion.entrenadorId.toString());
    
    return this.http.post<string>(this.apiurl + 'insertar', formData);
  }
  actualizar(sesion: ISesion): Observable<string> {
    const formData = new FormData();
    formData.append('sesionId', sesion.sesion_id.toString());
    formData.append('fecha', sesion.fecha);
    formData.append('horaInicio', sesion.hora_inicio);
    formData.append('horaFin', sesion.hora_fin);
    formData.append('miembroId', sesion.miembroId.toString());
    formData.append('entrenadorId', sesion.entrenadorId.toString());
    return this.http.post<string>(this.apiurl + 'actualizar', formData);
  }
}
