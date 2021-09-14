import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TarjetaCredito } from '../models/tarjetaCredito';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {

  myAppUrl = 'https://localhost:44337/';
  myApiUrl = 'api/TarjetaCredito/';
  cards: TarjetaCredito[];
  private actualizarFormulario = new BehaviorSubject<TarjetaCredito>({} as any);

  constructor(private http: HttpClient) { }

  public SaveCard(tarjeta: TarjetaCredito): Observable<TarjetaCredito>{
    return this.http.post<TarjetaCredito>(this.myAppUrl + this.myApiUrl, tarjeta);
  }

  public ListCards(){
    return this.http.get(this.myAppUrl + this.myApiUrl).toPromise().then(data => {
      this.cards = data as TarjetaCredito[];
    });
  }

  public deleteCard(id: number): Observable<TarjetaCredito>{
    return this.http.delete<TarjetaCredito>(this.myAppUrl + this.myApiUrl + id);
  }

  actualizar(tarjeta: TarjetaCredito){
    this.actualizarFormulario.next(tarjeta);
  }

  obtenerTarjeta(): Observable<TarjetaCredito>{
    return this.actualizarFormulario.asObservable();
  }

  actualizarTarjeta(id: number, tarjeta: TarjetaCredito): Observable<TarjetaCredito>{
    return this.http.put<TarjetaCredito>(this.myAppUrl + this.myApiUrl + id, tarjeta);
  }
}
