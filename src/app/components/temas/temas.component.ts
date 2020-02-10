import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Tema } from '../../models/tema';
import { FirebaseForoService } from '../../service/firebaseforo.service';

@Component({
  selector: 'app-temas',
  templateUrl: './temas.component.html'
})
export class TemasComponent implements OnInit {

  public seccion: string;
  public grupo: string;
  public temas: Array<Tema>;

  constructor(private rutaActiva: ActivatedRoute, public _fc: FirebaseForoService ) { 
    this.seccion = this.rutaActiva.snapshot.params.seccion;
    this.grupo = this.rutaActiva.snapshot.params.grupo;
  }

  ngOnInit() {
    this.temas = [];

    this._fc.getTemas(this.seccion,this.grupo).subscribe(data => {
      data.forEach(e => {
          this.temas.push(new Tema( e['creador'], e['nombretema'], e['seccion'], e['grupo'], e['fecha']));
          //console.log(new Tema( e['creador'], e['fecha'], e['nombretema'], e['seccion']));
      });
      }
    );


  }

}
