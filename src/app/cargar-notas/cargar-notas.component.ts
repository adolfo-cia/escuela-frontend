import { Component, OnInit, Inject } from '@angular/core';
import { Materia } from '../materia/materia-models';
import { Evaluacion } from '../evaluacion/evaluacion-model';
import { Router } from '@angular/router';
import { CargarNotasService } from './cargar-notas-service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserSession } from '../security/auth-model';
import { Nota } from '../inscripcion/inscripcion-model';
import { RestError } from '../shared/components/global-error-handler/rest-error';

@Component({
  selector: 'app-cargar-notas',
  templateUrl: './cargar-notas.component.html',
  styleUrls: ['./cargar-notas.component.css']
})
export class CargarNotasComponent implements OnInit {

  evaluacionCombo: Evaluacion[];
  materiaCombo: Materia[];
  panelOpenState: boolean = false;
  user: UserSession = new UserSession();

  constructor(private service: CargarNotasService,  private router: Router, public dialog: MatDialog) { }

  ngOnInit() {
    let token = localStorage.getItem('token');
    let helper = new JwtHelperService();
    let pepito = helper.decodeToken(token);
    this.user.username = pepito.sub;
    this.service.getMaterias(this.user.username).subscribe(data => {
      this.materiaCombo = data;
    });
  }

  goCreate(): void {
    //this.router.navigate(['/menu/evaluacion-detail']);
  }

  goEdit(evaluacion: Evaluacion): void {
    this.router.navigate(['/menu/cargar-notas-detail', evaluacion.id]);
  }

  goMenu() {
    this.router.navigate(['/menu/menu-cursado']);
  }

  onView(row: any): void {
    this.service.getNotasByEvaluacion(row.id).subscribe(
      result => {
        console.log(result);
        const dialogRef = this.dialog.open(DialogPruebaDialog, {
          width: '75%',
          data: {notas: result}
        });
    
        dialogRef.afterClosed().subscribe(result => {
          
        });
    });
  }

  llenarComboEvaluaciones(idMateria: number) {
    this.service.getEvaluaciones(idMateria).subscribe(data => {this.evaluacionCombo = data });
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'nota-edit.html',
})
export class DialogPruebaDialog {

  banderaEditar: boolean = false;
  backendError: boolean = false;
  backendErrorMessage: string;

  constructor(
    private service: CargarNotasService,
    public dialogRef: MatDialogRef<DialogPruebaDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  editar() {
    this.banderaEditar = true;
  }

  guardar(nota: Nota) {
    this.service.updateNota(nota).subscribe(
      data => {
        console.log('ok');
        this.banderaEditar = false;
      }, err => {
        var errorObj: RestError;
        try {
          errorObj = JSON.parse(err.error) as RestError;
        } catch (e) {
          errorObj = err.error as RestError;
        }

        this.backendError = true;
        if (errorObj !== null) {
          this.backendErrorMessage = errorObj.errors[0];
        } else {
          this.backendErrorMessage = 'Se produjo un error inesperado. Consulte al administrador.';
        }
      }
    );
    this.backendError = false;
  }

  cancelar() {
    this.banderaEditar = false;
  }

}

export interface DialogData {
  notas: Nota[];
}




 

  