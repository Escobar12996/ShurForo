export class Seccion{

  private id_grupo: number;
  private id_seccion: number;
  private nombre: string;
  
  constructor( grupo: number, id_seccion: number, nombre: string){
    this.id_seccion = id_seccion;
    this.id_grupo = grupo;
    this.nombre = nombre;
  }

  public toObject() {
    return {
      id_grupo: this.id_grupo,
      id_seccion: this.id_seccion,
      nombre: this.nombre,
    };
  }

  public getNombre(){
    return this.nombre;
  }

  public getSeccion(){
    return this.id_seccion;
  }

  public getGrupo(){
    return this.id_grupo;
  }

  public setId_seccion( id_seccion: number ){
    this.id_seccion = id_seccion;
  }

}