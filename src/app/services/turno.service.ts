import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TurnoService {
  private apiUrl = 'https://backend-turnos-1.onrender.com/api/turnos';

  constructor(private http: HttpClient) { }

  obtenerTurnosPorMedico(medicoId: string) {
    return this.http.get(`${this.apiUrl}/medico/${medicoId}`);
  }

  getTodos(): Observable<any[]> {
    return this.http.get<any[]>('https://backend-turnos-1.onrender.com/api/turnos');
  }

  reservarTurno(turnoId: string, pacienteId: string, obraSocial: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.apiUrl}/reservar/${turnoId}`, {
      pacienteId,
      obraSocialElegida: obraSocial
    }, { headers });
  }

  eliminarTurno(id: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }

  actualizarTurno(id: string, datos: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.apiUrl}/${id}`, datos, { headers });
  }

}
