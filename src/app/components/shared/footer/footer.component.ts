import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {

   anno:number;

  constructor() {
    this.anno = new Date().getFullYear();


   }

  ngOnInit() {
  }

}
