export class Tema{
  private id_tema: number;
  private id_creador: number;
  private nombretema: string;
  private id_seccion: number;
  private id_grupo: number;
  private fecha: number;


  constructor(id_tema: number, creador: number, nombretema: string, seccion: number, grupo: number, fecha: number){
    this.id_tema = id_tema;
    this.id_creador = creador;
    this.nombretema = nombretema; 
    this.id_seccion = seccion;
    this.id_grupo = grupo;
    this.fecha = fecha;
  }

  public toObject() {
    return {
      id_tema: this.id_tema,
      id_creador: this.id_creador,
      nombretema: this.nombretema,
      id_grupo: this.id_grupo,
      id_seccion: this.id_seccion,
      fecha: this.fecha
    };
  }

  public setidtema(id_tema: number){
    this.id_tema = id_tema;
  }

  public setCreador(creador: number){
    this.id_creador = creador;
  }
  public setNombreTema(nombretema: string){
    this.nombretema = nombretema;
  }
  public setSeccion(seccion: number){
    this.id_seccion = seccion;
  }
  public setGrupo(grupo: number){
    this.id_grupo = grupo;
  }
  public setFecha(fecha: number){
    this.fecha = fecha;
  }

  public getidtema(){
    return this.id_tema;
  }
  public getCreador(){
    return this.id_creador;
  }
  public getNombreTema(){
    return this.nombretema;
  }
  public getSeccion(){
    return this.id_seccion;
  }
  public getGrupo(){
    return this.id_grupo;
  }
  public getFecha(){
    return this.fecha;
  }

}