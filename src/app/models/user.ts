
export class User {

  private id: number;
  private usuario: string;
  private email: string;
  private contrasena: string;
  private nombreappe: string;
  private sexo: string;
  private pais: string;
  private aficiones: Array<string> = [];
  private admin: boolean;
  private bloqueado: boolean;

  constructor(id: number = 0, usuario = "", email = '', contrasena = "", nombreappe = "", sexo = "", pais = "", aficiones = [], admin = false, bloqueado = false){
    this.id = id;
    this.usuario = usuario;
    this.email = email;
    this.contrasena = contrasena;
    this.nombreappe = nombreappe;
    this.sexo = sexo;
    this.pais = pais;
    this.aficiones = aficiones;
    this.admin = admin;
    this.bloqueado = bloqueado;
  }
  public toObject() {
    return {
      id: this.id,
      usuario: this.usuario,
      email: this.email,
      nombreappe: this.nombreappe,
      sexo: this.sexo,
      pais: this.pais,
      aficiones: this.aficiones,
      admin: this.admin,
      bloqueado: this.bloqueado,
    };
  }

  public toRegister() {
    return {
      id: this.id,
      usuario: this.usuario,
      contrasena: this.contrasena,
      email: this.email,
      nombreappe: this.nombreappe,
      sexo: this.sexo,
      pais: this.pais,
      aficiones: this.aficiones,
      admin: this.admin,
      bloqueado: this.bloqueado,
    };
  }

  public changeAficiones(pass: string){
    let booleano = false;
    let poss = 0;

    if (this.aficiones !== undefined){
      for (let i = 0; i < this.aficiones.length; i++){
        if (this.aficiones[i] === pass){
          booleano = true;
          poss = i;
        }
      }

      if (booleano === true){
        this.aficiones.splice(poss, 1);
      } else{
        this.aficiones[this.aficiones.length] = pass;
      }
    } else {
      this.aficiones = [];
      this.aficiones[0] = pass;
    }
    console.log(this.aficiones);
  }

  public setId(id: number){
    this.id = id;
  }
  public setUsuario(usuario: string){
    this.usuario = usuario;
  }

  public setEmail(email: string){
    this.email = email;
  }

  public setContrasena(contrasena: string){
    this.contrasena = contrasena;
  }

  public setNombreappe(nombreappe: string){
    this.nombreappe = nombreappe;
  }

  public setSexo(sexo: string){
    this.sexo = sexo;
  }

  public setPais(pais: string){
    this.pais = pais;
  }

  public setAficiones(aficion: string[]){
    this.aficiones = aficion;
  }

  public setAdmin(admin: boolean){
    this.admin = admin;
  }

  public setBloqueado(bloqueado: boolean){
    this.bloqueado = bloqueado;
  }

  public getId(){
    return this.id;
  }
  
  public getUsuario(){
    return this.usuario;
  }

  public getEmail(){
    return this.email;
  }

  public getContrasena(){
    return this.contrasena;
  }

  public getNombreappe(){
    return this.nombreappe;
  }

  public getSexo(){
    return this.sexo;
  }

  public getPais(){
    return this.pais;
  }

  public getAficiones(){
    return this.aficiones;
  }

  public isAdmin() {
    return this.admin;
  }

  public isBloqueado(){
    return this.bloqueado;
  }
}
