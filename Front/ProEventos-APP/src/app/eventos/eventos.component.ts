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
  public imgWidth: number = 100;
  public showImg:boolean = false;
  public events: any = [];
  public eventsFiltered: any = [];
  private _listFilter:string="";
  
  public get listFilter():string{
    return this._listFilter;
  }

  public set listFilter(value:string){
    this._listFilter = value;
    this.eventsFiltered = this.listFilter ? this.filterEvent(this.listFilter) : this.events;
  }

  public filterEvent(filterBy:string): any{
    filterBy=filterBy.toLocaleLowerCase();
    return this.events.filter(
      (      event: { tema: string; local:string }) => event.tema.toLocaleLowerCase().indexOf(filterBy)!== -1 || event.local.toLocaleLowerCase().indexOf(filterBy)!== -1
    )
  }


  ngOnInit():void{
    this.getEvents();
  }

  public getEvents():void{
    this.http.get("http://localhost:5112/api/eventos").subscribe(
      response =>{ this.events = response
                  this.eventsFiltered=this.events},
      error => console.log(error)
    );
  }
  
}