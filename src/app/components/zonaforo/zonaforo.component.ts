import { Component, OnInit, Input } from '@angular/core';
import { FirebaseForoService } from '../../service/firebaseforo.service';
import { Seccion } from '../../models/seccion';

@Component({
  selector: 'app-zonaforo',
  templateUrl: './zonaforo.component.html'
})
export class ZonaforoComponent implements OnInit {
  @Input() grupo: any;
  private secciones: Array<Seccion>;
  
  constructor( public _fc: FirebaseForoService ) {}
  
  ngOnInit() {
    this.secciones = [];

    this._fc.getSecciones(this.grupo).subscribe(data => {
        
        data.forEach(e => {
          this.secciones.push(new Seccion(e['grupo'], e['nombre']));
        });
        }
      );
  }

}
