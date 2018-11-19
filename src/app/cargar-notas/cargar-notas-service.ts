import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Materia } from '../materia/materia-models';
import { Evaluacion } from '../evaluacion/evaluacion-model';
import { Nota } from '../inscripcion/inscripcion-model';

@Injectable()
export class CargarNotasService {

  endpoint = environment.apiurl;

  constructor(private http: HttpClient) { }

  getNotasByEvaluacion(idEvaluacion: Number) {
    return this.http.get<Nota[]>(this.endpoint + "/notas/getNotasByEvaluacion/"+idEvaluacion);
  }

  getMaterias(username: String) {
    return this.http.get<Materia[]>(this.endpoint + "/materias/"+username);
  }

  getEvaluaciones(idMateria: number) {
    return this.http.get<Evaluacion[]>(this.endpoint + "/evaluaciones/evaluacionesMaterias/"+idMateria);
  }

  updateNota(nota: Nota) {
    return this.http.put<Nota>(this.endpoint + "/notas/"+nota.id, nota);
  }

}