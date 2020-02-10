import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Tema } from '../../models/tema';
import { FirebaseForoService } from '../../service/firebaseforo.service';

@Component({
  selector: 'app-temas',
  templateUrl: './temas.component.html'
})
export class TemasComponent implements OnInit {

  public seccion: number;
  public grupo: number;
  public temas: Array<Tema>;

  constructor( public fc: FirebaseForoService, private router: Router, private ruta: ActivatedRoute ) {
  }

  ngOnInit() {
    this.grupo = parseInt(this.ruta.snapshot.params.id_grupo);
    this.seccion = parseInt(this.ruta.snapshot.params.id_seccion);

    this.fc.getTemas(this.seccion, this.grupo).subscribe(data => {
      this.temas = [];
      data.forEach(e => {
          this.temas.push(new Tema( e['id_tema'], e['id_creador'], e['nombretema'], e['id_seccion'], e['id_grupo'], e['fecha']));
      });
      }
    );
  }
}
