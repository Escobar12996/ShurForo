export class Tema{
  private creador: string;
  private nombretema: string; 
  private seccion: string;
  private grupo: string;
  private fecha: number;


  constructor(creador: string, nombretema: string, seccion: string, grupo: string, fecha: number){
    this.creador = creador;
    this.nombretema = nombretema; 
    this.seccion = seccion;
    this.grupo = grupo;
    this.fecha = fecha;
  }

  public setCreador(creador: string){
    this.creador = creador;
  }
  public setNombreTema(nombretema: string){
    this.nombretema = nombretema;
  }
  public setSeccion(seccion: string){
    this.seccion = seccion;
  }
  public setGrupo(grupo: string){
    this.grupo = grupo;
  }
  public setFecha(fecha: number){
    this.fecha = fecha;
  }

  public getCreador(){
    return this.creador;
  }
  public getNombreTema(){
    return this.nombretema;
  }
  public getSeccion(){
    return this.seccion;
  }
  public getGrupo(){
    return this.grupo;
  }
  public getFecha(){
    return this.fecha;
  }

}