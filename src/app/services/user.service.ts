import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = 'https://backend-turnos-1.onrender.com/api/auth';

  constructor(private http: HttpClient) { }

  crearSecretaria(nombre: string, email: string, password: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/crear-secretaria`, { nombre, email, password }, { headers });
  }
}
