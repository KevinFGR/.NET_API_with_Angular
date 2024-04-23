import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lote } from '@app/models/Lote';
import { Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class LoteService {

constructor(private http:HttpClient) { }

private baseURL:string = environment.apiURL+'api/lotes';

public getLotesByEventoId(eventoId:number): Observable<Lote[]>{
  return this.http.get<Lote[]>(`${this.baseURL}/${eventoId}`)
                                .pipe(take(1));
}

public saveLotes(eventoId: number, lotes: Lote[]):Observable<Lote[]>{
  return this.http.put<Lote[]>(`${this.baseURL}/${eventoId}`, lotes)
                                .pipe(take(1));
}
public deleteLote(eventoId: number, loteId: number):Observable<any>{
  return this.http.delete(`${this.baseURL}/${eventoId}/${loteId}`)
                          .pipe(take(1));
}
}
