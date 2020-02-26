import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Mysql } from '../../service/mysql.service';
import { FirebaseForoService } from '../../service/firebaseforo.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  public editor = ClassicEditor;
  private nombre = '';
  private cuerpo = '';
  private admin = false;
  private noticias = Array<any>();
  private borrar: number;

  @ViewChild("mymodalbor", {static: true}) mymodalbor: TemplateRef<any>;
  @ViewChild("mymodalnoticia", {static: true}) mymodalnoticia: TemplateRef<any>;

  constructor( private mysql: Mysql, public _fc: FirebaseForoService, private modalService: NgbModal) {

    this._fc.getUsuarioId(parseInt(localStorage.getItem('theItem'))).subscribe(data => {
      data.forEach(e => {
        if (e['admin']) {
          this.admin = true;
        }else {
          this.admin = false;
        }
      });
    });


    this.mysql.getNoticias().subscribe(data => {
      this.noticias = [];
      console.log(data);
      this.noticias = data;
    });
   }

  ngOnInit() {}

  thisborrar(numero: number,  ){
    this.borrar = numero;
    this.modalService.open(this.mymodalbor);
  }

  noborrar() {
    this.modalService.dismissAll();
  }

  borrardt(){
    this.mysql.delNoticia(this.borrar).subscribe();
    this.modalService.dismissAll();
    location.reload();
  }

  crear(){
    this.modalService.open(this.mymodalnoticia);
  }

  enviarnoticia(form: NgForm){

    if (!form.invalid){
      this.mysql.addNoticia(this.nombre, this.cuerpo).subscribe();
      location.reload();
    }
  }
}
