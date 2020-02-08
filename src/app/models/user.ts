
export class UserModel {

  usuario: string;
  email: string;
  contrasena: string;
  nombreappe: string;
  sexo: string;
  pais: string;
  aficiones: Array<string> = [];
  constructor(usuario = "", email = '', contrasena = "", nombreappe = "", sexo = "", pais = "", aficiones = []){
    this.usuario = usuario;
    this.email = email;
    this.contrasena = contrasena;
    this.nombreappe = nombreappe;
    this.sexo = sexo;
    this.pais = pais;
    this.aficiones = aficiones;
  }
  public toObject() {
    return {
      usuario: this.usuario,
      email: this.email,
      contrasena: this.contrasena,
      nombreappe: this.nombreappe,
      sexo: this.sexo,
      pais: this.pais,
      aficiones: this.aficiones,
    };
  }

}
