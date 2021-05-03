import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActoresService } from '../../../core/services/actores.service';
import { Actor } from '../../../core/models/actor';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-actores',
  templateUrl: './actores.component.html',
  styleUrls: ['./actores.component.scss']
})
export class ActoresComponent implements OnInit {

  displayedColumns: string[] = ['ActOperativa_Nom', 'ActorEntidad_Nom', 'CPoblado_Nom','Distrito_Nom',  'TipoActor_Abrev', "v_siglas_oficina"];
  
  dataSource : MatTableDataSource<Actor>;

  @ViewChild(MatPaginator) paginator : MatPaginator; //Referenciamos el paginador
  @ViewChild(MatSort) sort : MatSort;

  //Cantidad de datos de la tabla paciente
  cantidad: number;

  constructor(private actoresService: ActoresService) { }

  ngOnInit(): void {
    this.actoresService.getActores().subscribe(data=>this.crearTabla(data))
  }


  //Este metodo solo se usa cuando no se pagina la data
  crearTabla(data: Actor[]){
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator //Asignamos el paginador a la tabla
    this.dataSource.sort = this.sort; // Asignamos el clasificador o sort
  }

}
