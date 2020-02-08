import { Component, OnInit } from '@angular/core';
import { FirebaseForoService } from '../../service/firebaseforo.service';
import { Grupo } from '../../models/grupo';

@Component({
  selector: 'app-foro',
  templateUrl: './foro.component.html'
})
export class ForoComponent implements OnInit {
  public grupos: Array<Grupo>;

  constructor( public _fc: FirebaseForoService ) {
    this.grupos = [];
    this._fc.getGrupos().subscribe(data => {
      data.forEach(e => {
        this.grupos.push(new Grupo(e['nombre']));
      });
    }

    );

  }


  ngOnInit() {
  }


}
