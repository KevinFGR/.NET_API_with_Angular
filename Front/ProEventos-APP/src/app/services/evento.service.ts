import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evento } from '../models/Evento';

@Injectable()
export class EventoService {

  constructor(private http:HttpClient) { }

  private baseURL:string = "http://localhost:5000/api/eventos";

  public getEvents(): Observable<Evento[]>{
    return this.http.get<Evento[]>(this.baseURL);
  }

  public getEventsByTheme(theme:string): Observable<Evento[]>{
    return this.http.get<Evento[]>(`${this.baseURL}/${theme}/tema`);
  }

  public getEventById(id:number): Observable<Evento>{
    return this.http.get<Evento>(`${this.baseURL}/${id}`);
  }
  public postEvent(event:Evento):Observable<Evento>{
    return this.http.post<Evento>(this.baseURL, event);
  }
  public putEvent(id:number, event:Evento):Observable<Evento>{
    return this.http.put<Evento>(`${this.baseURL}/${id}`,event);
  }
  public deleteEvent(id:number):Observable<any>{
    return this.http.delete(`${this.baseURL}/${id}`);
  }


}
