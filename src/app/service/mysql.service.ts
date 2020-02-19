import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Mysql {

  

  constructor(private http:HttpClient) {
  }

  getNoticias() {
    return this.http.get(`http://localhost/shurapy/`)
          .pipe(map((res:any) => res.items));
  }

  addNoticia(noticia:string, cuerpo:string) {
    const formData = new FormData();
    formData.append("noticia", noticia);
    formData.append("cuerpo", cuerpo);

    return this.http.post(`http://localhost/shurapy/add.php`, formData);
  }

  delNoticia(noticia:number) {
    const formData = new FormData();
    formData.append("remove", '' + noticia);

    return this.http.post(`http://localhost/shurapy/add.php`, formData);
  }
}
