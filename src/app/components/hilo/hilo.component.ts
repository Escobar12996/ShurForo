import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseForoService } from '../../service/firebaseforo.service';
import { Mensaje } from '../../models/mensaje';
import { NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { Tema } from '../../models/tema';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-hilo',
  templateUrl: './hilo.component.html'
})
export class HiloComponent implements OnInit {

  // necesario para la carga
  private temaid: number;
  private seccion: number;
  private grupo: number;
  private usuarioexiste = false;
  public mensajes: Array<Mensaje>;
  public usuarios: Array<User>;
  public idu: number;
  public admin: false;

  // editor
  public editor = ClassicEditor;

  // formulario
  private ultimoid = 0;
  private valido = true;
  private mensaje: Mensaje = new Mensaje();
  private mensajeed: Mensaje = new Mensaje();
  @ViewChild("mymodal", {static: true}) myModalo: TemplateRef<any>;
  @ViewChild("mymodalbor", {static: true}) mymodalbor: TemplateRef<any>;
  
  // tema a mostrar
  private tema: Tema = new Tema(0,0,'cargando',0,0,0);



  constructor(public fc: FirebaseForoService, private ruta: ActivatedRoute, private router: Router, private modalService: NgbModal) {

    // cambia la bandera para mostrar el wisiwi ese o el login
    if(JSON.parse(sessionStorage.getItem('usuario')) !== null) {
      this.usuarioexiste = true;
      this.idu = JSON.parse(sessionStorage.getItem('usuario'))['id'];
      this.admin = JSON.parse(sessionStorage.getItem('usuario'))['admin'];
    }

    // obtiene todos los usuarios para almacenarlos en el array
    this.fc.getUsuarios().subscribe(data => {
      this.usuarios = [];
      data.forEach(e => {
        this.usuarios.push(new User(e['id'],e['usuario'] ,e['email'],e['contrasena'],e['nombreappe'],e['sexo'],e['pais'],e['aficiones']));
      });
    });

    // obtenemos que tema cargar con estos parametros
    this.grupo = parseInt( this.ruta.snapshot.params.id_grupo );
    this.seccion = parseInt( this.ruta.snapshot.params.id_seccion );
    this.temaid = parseInt( this.ruta.snapshot.params.id_tema );

    //cargo un tema para poder buscarlo en la bd
    const temac = new Tema(parseInt( this.ruta.snapshot.params.id_tema ),
                        0,
                        '',
                        parseInt( this.ruta.snapshot.params.id_seccion),
                        parseInt( this.ruta.snapshot.params.id_grupo ),
                        parseInt( this.ruta.snapshot.params.id_tema ));


    // buscamos y cargamos el tema, dentro de este cargamos los mensajes etc
    this.fc.getThisTema(temac).subscribe(data => {

      console.log(data);
      // si hay datos en el array
      if (data.length > 0) {
        // recorremos el array
        data.forEach(e => {

          // si de verdad existe el tema en el array
          if (e['id_tema'] === this.temaid && e['id_grupo'] === this.grupo && e['id_seccion'] === this.seccion) {

            // cargamos el tema en el objeto de tema
            this.tema = new Tema( e['id_tema'], e['id_creador'], e['nombretema'], e['id_seccion'], e['id_grupo'], e['fecha']);

            // actualizo el mensaje
            this.mensaje = new Mensaje(this.tema.getidtema(), '', 0, this.grupo,this.seccion, this.ultimoid);
            this.mensajeed = new Mensaje(this.tema.getidtema(), '', 0, this.grupo,this.seccion, this.ultimoid);

            // recorro los mensajes para cargarlos
            this.fc.getMensajes(this.tema).subscribe(dato => {

              // borro el array de los mensajes para que borre los anteriores
              this.mensajes = [];

              // recorro los mensajes y los guardo
              dato.forEach(f => {

                  // los guardo en memoria
                  this.mensajes.push(new Mensaje( f['tema'], f['mensaje'], f['usuario'], f['grupo'], f['seccion'], f['id']));

                  // si este id, es mayor que el que tengo, lo guardo
                  if (this.ultimoid < f['id']){
                    this.ultimoid = f['id'];
                  }
              });
              }
            );
          }
        });
        // si no a cargado nada, lo saco de la pagina
      } else {
        this.router.navigate(['/notfound']);
      }
      }
    );
  }

  ngOnInit() {}

  // boton de enviar nuevo mensaje
  enviar( form: NgForm ) {

    // controlo que el formulario sea valido y que el usuario exista
    if (!form.invalid && this.usuarioexiste) {

      // le agrego el id
      this.mensaje.setId(this.ultimoid + 1);
      this.mensaje.setUsuario(JSON.parse(sessionStorage.getItem('usuario'))['id']);
      // aumento el ultimo id
      this.ultimoid++;
      // almaceno el mensaje
      this.fc.saveMensaje(this.mensaje);

      //actualizo la fecha
      this.tema.setFecha(new Date().getTime());
      this.fc.updateTema(this.tema);

      // creo un nuevo mensaje
      this.mensaje = new Mensaje(this.tema.getidtema(), '',
                                  JSON.parse(sessionStorage.getItem('usuario'))['id'],
                                  this.grupo,this.seccion,
                                  this.ultimoid);
      // pongo el valido a true
      this.valido = true;

    // en este caso el mensaje no se a podido mandar
    } else {
      this.valido = false;
    }
  }

  // devuelve el id del usuario
  getusuario(id: number){
    for (let i = 0; i < this.usuarios.length; i++) {
      if (this.usuarios[i].getId() === id){
        return this.usuarios[i];
      }
    }
  }

  eliminar(id: number, usuario: number){
    this.mensajeed = new Mensaje(this.tema.getidtema(), '',
                                  JSON.parse(sessionStorage.getItem('usuario'))['id'],
                                  this.grupo,this.seccion,
                                  this.ultimoid);

    this.mensajeed.setId(id);
    this.mensajeed.setUsuario(usuario);
    this.modalService.open(this.mymodalbor);
  }

  editarbut(id: number, usuario: number, mensaje: string){
    // le agrego el id
    this.mensajeed.setId(id);
    this.mensajeed.setUsuario(usuario);
    this.mensajeed.setMensaje(mensaje);
    this.modalService.open(this.myModalo);
  }

  edit(){
    this.fc.upMensaje(this.mensajeed);

    this.mensajeed = new Mensaje(this.tema.getidtema(), '',
                                  JSON.parse(sessionStorage.getItem('usuario'))['id'],
                                  this.grupo,this.seccion,
                                  this.ultimoid);

    this.modalService.dismissAll();
  }

  borrar(){
    this.fc.delMensaje(this.mensajeed);
    this.modalService.dismissAll();
  }

  noborrar(){
    this.modalService.dismissAll();
  }
}
