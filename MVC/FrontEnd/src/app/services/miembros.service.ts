import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMiembro } from '../interfaces/IMiembro';

@Injectable({
  providedIn: 'root'
})
export class MiembrosService {
  apiurl = 'http://localhost/proyecto-gimnasio-sexto/MVC/controllers/miembros.controller.php?op=';
  
  constructor(private http: HttpClient) {}

  todos(): Observable<IMiembro[]> {
    return this.http.get<IMiembro[]>(this.apiurl + 'todos');
  }
  uno(miembroId: number): Observable<IMiembro> {
    const formData = new FormData();
    formData.append('miembroId', miembroId.toString());
    return this.http.post<IMiembro>(this.apiurl + 'uno', formData);
  }

  eliminar(miembroId: number): Observable<number> {
    const formData = new FormData();
    formData.append('miembroId', miembroId.toString());
    return this.http.post<number>(this.apiurl + 'eliminar', formData);
  }
  insertar(miembro: IMiembro): Observable<string> {
    const formData = new FormData();
    formData.append('nombre', miembro.nombre);
    formData.append('apellido', miembro.apellido);
    formData.append('fechaNacimiento', miembro.fecha_nacimiento);
    formData.append('tipoMembresia', miembro.tipo_membresia);
    return this.http.post<string>(this.apiurl + 'insertar', formData);
  }
  actualizar(miembro: IMiembro): Observable<string> {
    const formData = new FormData();
    formData.append('miembroId', miembro.miembro_id.toString());
    formData.append('nombre', miembro.nombre);
    formData.append('apellido', miembro.apellido);
    formData.append('fechaNacimiento', miembro.fecha_nacimiento);
    formData.append('tipoMembresia', miembro.tipo_membresia);
    return this.http.post<string>(this.apiurl + 'actualizar', formData);
  }
}
