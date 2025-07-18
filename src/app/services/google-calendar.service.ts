import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoogleCalendarService {

  private apiUrl = 'https://backend-turnos-1.onrender.com'; // URL de tu backend

  constructor(private http: HttpClient) { }

  crearEvento(
    summary: string,
    description: string,
    startDateTime: string,
    endDateTime: string
  ): Observable<any> {
    return this.http.post(`${this.apiUrl}/crear-evento`, {
      summary,
      description,
      startDateTime,
      endDateTime
    });
  }
}