
export class Grupo{

  private id_grupo: number;
  private nombre: string;

  constructor(nombre: string, id_grupo: number){
    this.nombre = nombre;
    this.id_grupo = id_grupo;
  }

  public setIdgrupo(id_grupo){
    this.id_grupo = id_grupo;
  }

  public setNombre(nombre: string){
    this.nombre = nombre;
  }

  public getIdgrupo(){
    return this.id_grupo;
  }

  public toObject(){
    return {
      nombre: this.nombre,
      id_grupo: this.id_grupo,
    };
  }

}