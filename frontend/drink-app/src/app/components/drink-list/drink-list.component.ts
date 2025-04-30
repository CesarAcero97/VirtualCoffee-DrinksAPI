import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrinkService } from '../../services/drink.service';
import { Drink } from '../../models/drink.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-drink-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './drink-list.component.html',
  styleUrls: ['./drink-list.component.css']
})
export class DrinkListComponent implements OnInit, OnDestroy {
  drinks: Drink[] = [];
  selectedDrink: Drink | null = null;
  private subscription: Subscription = new Subscription();

  constructor(private drinkService: DrinkService) { }

  ngOnInit(): void {
    this.loadDrinks();
    
    // Suscribirse a los cambios en la lista
    this.subscription.add(
      this.drinkService.getRefreshList().subscribe(() => {
        this.loadDrinks();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadDrinks(): void {
    this.drinkService.getDrinks().subscribe(
      (data) => {
        this.drinks = data;
      },
      (error) => {
        console.error('Error al cargar las bebidas:', error);
      }
    );
  }

  showDrinkDetails(id: number): void {
    this.drinkService.getDrink(id).subscribe(
      (data) => {
        this.selectedDrink = data;
      },
      (error) => {
        console.error('Error al cargar la bebida:', error);
      }
    );
  }
} 