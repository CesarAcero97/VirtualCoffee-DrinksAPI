import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrinkFormComponent } from './components/drink-form/drink-form.component';
import { DrinkListComponent } from './components/drink-list/drink-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, DrinkListComponent, DrinkFormComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'VirtualCoffee Drinks';
}
