import { Component, OnInit, inject } from '@angular/core';
import { AlumnoService } from '../../services/alumno';
import { Alumno } from '../../models/alumno';

@Component({
  selector: 'app-alumno-list',
  imports: [],
  templateUrl: './alumno-list.html',
  styleUrl: './alumno-list.scss'
})
export class AlumnoList implements OnInit {
  private alumnoService = inject(AlumnoService);
  alumnos: Alumno[] = [];
  mensajeError: string = '';

  ngOnInit(): void {
    this.cargarAlumnos();
  }

  cargarAlumnos(): void {
    this.alumnoService.listar().subscribe({
      next: (data) => this.alumnos = data,
      error: (e) => {
        console.error('Error:', e);
        this.mensajeError = 'Error de conexión. ¿El backend está corriendo?';
      }
    });
  }

  eliminar(id: number): void {
    if (confirm('¿Está seguro de eliminar a este alumno?')) {
      this.alumnoService.eliminar(id).subscribe({
        next: () => {
          // Si el backend responde 204, lo quitamos de la lista visual
          this.alumnos = this.alumnos.filter(a => a.id !== id);
        },
        error: (e) => {
          console.error('Error:', e);
          this.mensajeError = 'Error al eliminar el registro.';
        }
      });
    }
  }
}