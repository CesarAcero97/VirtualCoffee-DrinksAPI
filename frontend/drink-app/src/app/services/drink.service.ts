import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Drink } from '../models/drink.model';

@Injectable({
  providedIn: 'root'
})
export class DrinkService {
  private apiUrl = 'http://localhost:8000/drinks';
  private refreshList = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  // Obtener todas las bebidas
  getDrinks(): Observable<Drink[]> {
    return this.http.get<Drink[]>(this.apiUrl);
  }

  // Obtener una bebida por ID
  getDrink(id: number): Observable<Drink> {
    return this.http.get<Drink>(`${this.apiUrl}/${id}`);
  }

  // Crear una nueva bebida
  createDrink(drink: Drink): Observable<Drink> {
    return this.http.post<Drink>(this.apiUrl, drink);
  }

  updateDrink(id: number, drink: Drink): Observable<Drink> {
    return this.http.put<Drink>(`${this.apiUrl}/${id}`, drink);
  }

  deleteDrink(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Métodos para manejar la actualización de la lista
  getRefreshList(): Observable<boolean> {
    return this.refreshList.asObservable();
  }

  triggerRefreshList(): void {
    this.refreshList.next(true);
  }
} 