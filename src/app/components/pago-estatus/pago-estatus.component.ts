import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pago-estatus',
  imports: [CommonModule],
  templateUrl: './pago-estatus.component.html',
  styleUrl: './pago-estatus.component.css'
})
export class PagoEstatusComponent implements OnInit {
  mensaje = 'Procesando pago...';
  estado: 'exitoso' | 'fallido' | 'pendiente' | 'otro' = 'otro';

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const status = params['collection_status'] || params['status'];

      if (status === 'approved') {
        this.estado = 'exitoso';
        this.mensaje = '¡Pago aprobado! Reservando turno...';

        const turnoStr = localStorage.getItem('turnoAPagar');
        if (!turnoStr) {
          this.mensaje = 'No se encontró información del turno.';
          return;
        }

        const turno = JSON.parse(turnoStr);
        this.http.post('https://backend-turnos-1.onrender.com/api/turnos/reservar', {
          turnoId: turno._id,
          pacienteId: turno.paciente?._id,
          obraSocial: turno.paciente?.obraSocial
        }).subscribe({
          next: () => {
            this.mensaje = '¡Pago aprobado y turno reservado con éxito!';
            localStorage.removeItem('turnoAPagar');
          },
          error: () => {
            this.mensaje = 'Pago aprobado, pero hubo un error al reservar el turno.';
          }
        });
      } else if (status === 'in_process' || status === 'pending') {
        this.estado = 'pendiente';
        this.mensaje = 'Tu pago está pendiente. Te avisaremos cuando se confirme.';
      } else if (status === 'rejected') {
        this.estado = 'fallido';
        this.mensaje = 'Tu pago fue rechazado. Por favor, intenta nuevamente.';
      } else {
        this.mensaje = 'No se pudo determinar el estado del pago.';
      }
    });
  }
}
