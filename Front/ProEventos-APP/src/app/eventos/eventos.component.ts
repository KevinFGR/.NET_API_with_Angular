import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent {

  constructor(private http:HttpClient){

  }

  public eventos: any;

  ngOnInit():void{
    this.getEventos();
  }

  public getEventos():void{
    this.http.get("http://localhost:5112/api/eventos").subscribe(
      response => this.eventos = response,
      error => console.log(error)
    );
  }
}