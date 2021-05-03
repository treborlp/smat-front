import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-actores-edicion',
  templateUrl: './actores-edicion.component.html',
  styleUrls: ['./actores-edicion.component.scss']
})
export class ActoresEdicionComponent implements OnInit {

  horizontalStepperForm: FormGroup;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {

    // Horizontal stepper form
    this.horizontalStepperForm = this._formBuilder.group({
      step1: this._formBuilder.group({
          email   : ['', [Validators.required, Validators.email]],
          country : ['', Validators.required],
          oficina : ['', Validators.required],
          language: ['', Validators.required]
      }),
      step2: this._formBuilder.group({
          firstName: ['', Validators.required],
          lastName : ['', Validators.required],
          userName : ['', Validators.required],
          about    : ['']
      }),
      step3: this._formBuilder.group({
              byEmail         : this._formBuilder.group({
              companyNews     : [true],
              featuredProducts: [false],
              messages        : [true]
          }),
          pushNotifications: ['everything', Validators.required]
      })
  });
  }

}
