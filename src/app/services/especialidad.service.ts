import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class EspecialidadService {
  private apiUrl = 'https://backend-turnos-1.onrender.com/api/especialidades';

  constructor(private http: HttpClient) { }

  getEspecialidades() {
    return this.http.get(this.apiUrl);
  }

  crear(nombre: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.apiUrl, { nombre }, { headers });
  }

  eliminar(id: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }
}
