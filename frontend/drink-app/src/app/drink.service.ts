import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Drink {
  id: number;
  name: string;
  description: string;
  size: string;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class DrinkService {
  private readonly apiUrl = 'http://localhost:8000/menu';

  constructor(private readonly http: HttpClient) {}

  getMenu(): Observable<Drink[]> {
    return this.http.get<Drink[]>(this.apiUrl + '/');
  }

  addDrink(drink: Drink): Observable<Drink> {
    return this.http.post<Drink>(this.apiUrl + '/', drink);
  }
}
