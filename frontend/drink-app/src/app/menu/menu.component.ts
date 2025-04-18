import { Component, OnInit } from '@angular/core';
import { Drink, DrinkService } from '../drink.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {
  menu: Drink[] = [];
  newDrink: Drink = { id: 0, name: '', description: '', size: '', price: 0 };

  constructor(private readonly drinkService: DrinkService) {}

  ngOnInit(): void {
    this.loadMenu();
  }

  loadMenu(): void {
    this.drinkService.getMenu().subscribe(data => this.menu = data);
  }

  addDrink(): void {
    this.drinkService.addDrink(this.newDrink).subscribe({
      next: () => {
        this.loadMenu();
        this.newDrink = { id: 0, name: '', description: '', size: '', price: 0 };
      },
      error: (err) => {
        console.error('Error al agregar bebida:', err);
        alert('No se pudo agregar la bebida. Verifica la conexión con el servidor.');
      }
    });
  }
  
}
