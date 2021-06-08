import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ActoresComponent } from './actores.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { ActoresEdicionComponent } from './actores-edicion/actores-edicion.component';
import { MatButtonModule } from '@angular/material/button';
import {MatStepperModule} from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import { SharedModule } from '../../../shared/shared.module';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { CustomDateAdapter } from 'app/core/config/custom-adapter';


const actoresRoutes: Route[] = [
  {
      path     : '',
      pathMatch : 'full',
      redirectTo: 'actores'
  },
  {
      path     : 'actores',
      component: ActoresComponent,
      children: [
        {path: "nuevo", component: ActoresEdicionComponent},
      ]
  },
  
];

@NgModule({
  declarations: [
    ActoresComponent,
    ActoresEdicionComponent
  ],
  exports: [
    
  ],
  imports     : [
      MatTableModule,
      MatPaginatorModule,
      MatSortModule,
      MatIconModule,
      MatButtonModule,
      MatStepperModule,
      MatFormFieldModule,
      MatSelectModule,
      MatCheckboxModule,
      MatRadioModule,
      MatInputModule,
      MatDatepickerModule,
      MatNativeDateModule,
      SharedModule,
      RouterModule.forChild(actoresRoutes)
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'}, //Necesarios para el data piker personalizado
    {provide: DateAdapter, useClass: CustomDateAdapter}, //Necesarios para el data piker personalizado
  ]
})
export class ActoresModule { }
