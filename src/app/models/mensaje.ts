export class Mensaje{

  private tema: string;
  private mensaje: string;
  private usuario: string;
  private grupo: string;
  private seccion: string;
  private id: number;
  
  constructor(tema: string = '', mensaje: string = '', usuario: string = '', grupo: string = '', seccion: string = '', id: number = 0){
    this.tema = tema;
    this.mensaje = mensaje;
    this.usuario = usuario;
    this.grupo = grupo;
    this.seccion = seccion;
    this.id = id;
  }

  public toObject() {
    return {
      tema: this.tema,
      mensaje: this.mensaje,
      usuario: this.usuario,
      grupo: this.grupo,
      seccion: this.seccion,
      id: this.id
    };
  }
  
  public setTema(tema: string){
    this.tema = tema;
  }

  public setMensaje(mensaje: string){
    this.mensaje = mensaje;
  }

  public setUsuario(usuario: string){
    this.usuario = usuario;
  }

  public setGrupo(grupo: string){
    this.grupo = grupo;
  }

  public setSeccion(seccion: string){
    this.seccion = seccion;
  }

  public setId(id: number){
    this.id = id;
  }

  
  public getTema(){
    return this.tema;
  }

  public getMensaje(){
    return this.mensaje;
  }

  public getUsuario(){
    return this.usuario;
  }

  public getGrupo(){
    return this.grupo;
  }

  public getSeccion(){
    return this.seccion;
  }

  public getId(){
    return this.id;
  }
}