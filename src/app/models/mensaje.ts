export class Mensaje{

  private id_tema: number;
  private mensaje: string;
  private id_usuario: number;
  private id_grupo: number;
  private id_seccion: number;
  private id: number;

  constructor(tema: number, mensaje: string, usuario: number, grupo: number, seccion: number, id: number = 0){
    this.id_tema = tema;
    this.mensaje = mensaje;
    this.id_usuario = usuario;
    this.id_grupo = grupo;
    this.id_seccion = seccion;
    this.id = id;
  }

  public toObject() {
    return {
      tema: this.id_tema,
      mensaje: this.mensaje,
      usuario: this.id_usuario,
      grupo: this.id_grupo,
      seccion: this.id_seccion,
      id: this.id
    };
  }

  public setTema(tema: number){
    this.id_tema = tema;
  }

  public setMensaje(mensaje: string){
    this.mensaje = mensaje;
  }

  public setUsuario(usuario: number){
    this.id_usuario = usuario;
  }

  public setGrupo(grupo: number){
    this.id_grupo = grupo;
  }

  public setSeccion(seccion: number){
    this.id_seccion = seccion;
  }

  public setId(id: number){
    this.id = id;
  }

  public getTema(){
    return this.id_tema;
  }

  public getMensaje(){
    return this.mensaje;
  }

  public getUsuario(){
    return this.id_usuario;
  }

  public getGrupo(){
    return this.id_grupo;
  }

  public getSeccion(){
    return this.id_seccion;
  }

  public getId(){
    return this.id;
  }
}