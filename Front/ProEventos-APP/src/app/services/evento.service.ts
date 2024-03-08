import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Evento } from '../models/Evento';

@Injectable()
export class EventoService {

  constructor(private http:HttpClient) { }

  private baseURL:string = "http://localhost:5000/api/eventos";

  public getEvents(): Observable<Evento[]>{
    return this.http.get<Evento[]>(this.baseURL)
      .pipe(take(1));
      // the take(1) functions makes the HTTP requisition be used (subscribed) just one time.
      // After that, its unsubscribed automaticaly
  }

  public getEventsByTheme(theme:string): Observable<Evento[]>{
    return this.http.get<Evento[]>(`${this.baseURL}/${theme}/tema`)
      .pipe(take(1));
  }

  public getEventById(id:number): Observable<Evento>{
    return this.http.get<Evento>(`${this.baseURL}/${id}`)
      .pipe(take(1));
  }
  public postEvent(event:Evento):Observable<Evento>{
    return this.http.post<Evento>(this.baseURL, event)
      .pipe(take(1));
  }
  public putEvent(event:Evento):Observable<Evento>{
    return this.http.put<Evento>(`${this.baseURL}/${event.id}`,event)
      .pipe(take(1));
  }
  public deleteEvent(id:number):Observable<any>{
    return this.http.delete(`${this.baseURL}/${id}`)
      .pipe(take(1));
  }


}
