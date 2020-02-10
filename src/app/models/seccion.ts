export class Seccion{

  private id_grupo: number;
  private id_seccion: number;
  private nombre: string;
  
  constructor(id_seccion: number, grupo: number, nombre: string){
    this.id_seccion = id_seccion;
    this.id_grupo = grupo;
    this.nombre = nombre;
  }

}