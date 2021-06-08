import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { MonitoreoComponent } from './monitoreo.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { SharedModule } from '../../../shared/shared.module';
import { VjsPlayerComponent } from './vjs-player/vjs-player.component';



const monitoreoRoutes: Route[] = [
  /*{
      path     : '',
      pathMatch : 'full',
      redirectTo: 'monitoreo'
  },*/
  {
      path     : '',
      component: MonitoreoComponent
  },
  
];

@NgModule({
  declarations: [
    MonitoreoComponent,
    VjsPlayerComponent
  ],
  exports: [
    VjsPlayerComponent
  ],
  imports: [
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
      CommonModule,
      RouterModule.forChild(monitoreoRoutes)
  ]
})
export class MonitoreoModule { }
