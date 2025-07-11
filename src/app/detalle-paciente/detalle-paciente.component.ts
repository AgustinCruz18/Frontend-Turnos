import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detalle-paciente',
  imports: [CommonModule],
  templateUrl: './detalle-paciente.component.html',
  styleUrl: './detalle-paciente.component.css'
})
export class DetallePacienteComponent {
  ficha: any = {};
  userId = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id') || '';
    this.http.get<any>(`https://backend-turnos-1.onrender.com/api/ficha/${this.userId}`).subscribe({
      next: (data) => {
        this.ficha = data;
      },
      error: (err) => {
        console.error('Error al cargar la ficha:', err);
      }
    });
  }

  irAModificar(): void {
    this.router.navigate([`/datos-personales/${this.userId}`]);
  }
} 
