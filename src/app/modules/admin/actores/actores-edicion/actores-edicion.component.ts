import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-actores-edicion',
  templateUrl: './actores-edicion.component.html',
  styleUrls: ['./actores-edicion.component.scss']
})
export class ActoresEdicionComponent implements OnInit {

  //Fecha seleccionada
  fechaSeleccionada: Date = new Date();
  maxFecha: Date = new Date();
  
  //Gestión de formulario
  horizontalStepperForm: FormGroup;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {

    // Horizontal stepper form
    this.horizontalStepperForm = this._formBuilder.group({
      step1: this._formBuilder.group({
          oficina : ['', Validators.required],
          actividadOperativa : ['', Validators.required],
          personal : ['', Validators.required],
      }),
      step2: this._formBuilder.group({
          unidadMedida: ['', Validators.required],
          viaEntrega : ['', Validators.required],
          fecha : ['', Validators.required],
          estrategia    : ['']
      }),
      step3: this._formBuilder.group({
          tipoActor: ['', Validators.required],
          nombreActor : ['', Validators.required],
          ubicacion: this._formBuilder.group({
            departamento: ['', Validators.required],
            provincia : ['', Validators.required],
            distrito : ['', Validators.required],
            centroPoblado : ['', Validators.required],
          })
          
    })
  });
  }

}
