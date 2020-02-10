import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor( public fc: FirebaseForoService, private router: Router ) {
  }

  ngOnInit() {

    if (sessionStorage.getItem('grupo') === null || sessionStorage.getItem('grupo') === null){
      this.router.navigate(['/foro']);
    } else {
      this.seccion = parseInt(sessionStorage.getItem('seccion'));
      this.grupo = parseInt(sessionStorage.getItem('grupo'));
    }
    

    this.fc.getTemas(this.seccion, this.grupo).subscribe(data => {
      this.temas = [];
      data.forEach(e => {
          this.temas.push(new Tema( e['id_tema'], e['id_creador'], e['nombretema'], e['id_seccion'], e['id_grupo'], e['fecha']));
      });
      }
    );
  }

  navegar(id_tema: number){
    sessionStorage.setItem('tema', '' + id_tema);
    this.router.navigate(['/hilo']);
  }

}
