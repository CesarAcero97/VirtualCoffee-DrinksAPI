import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray, FormControl } from '@angular/forms';
import { DrinkService } from '../../services/drink.service';
import { Drink } from '../../models/drink.model';

@Component({
  selector: 'app-drink-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './drink-form.component.html',
  styleUrls: ['./drink-form.component.css']
})
export class DrinkFormComponent implements OnInit {
  drinkForm: FormGroup;
  availableSizes = ['SMALL', 'MEDIUM', 'LARGE'];

  constructor(
    private fb: FormBuilder,
    private drinkService: DrinkService
  ) {
    this.drinkForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      sizes: this.fb.array([]),
      price: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.availableSizes.forEach(() => {
      (this.drinkForm.get('sizes') as FormArray).push(new FormControl(false));
    });
  }

  get sizes() {
    return this.drinkForm.get('sizes') as FormArray;
  }

  onSubmit(): void {
    if (this.drinkForm.valid) {
      const selectedSizes = this.sizes.value
        .map((checked: boolean, i: number) => checked ? this.availableSizes[i] : null)
        .filter((size: string | null) => size !== null);

      if (selectedSizes.length === 0) {
        alert('Debe seleccionar al menos un tamaño');
        return;
      }

      const newDrink: Drink = {
        name: this.drinkForm.get('name')?.value,
        description: this.drinkForm.get('description')?.value,
        availableSizes: selectedSizes.join(','),
        price: this.drinkForm.get('price')?.value
      };

      this.drinkService.createDrink(newDrink).subscribe(
        (response) => {
          console.log('Bebida creada:', response);
          this.drinkForm.reset();
          this.sizes.clear();
          this.availableSizes.forEach(() => this.sizes.push(new FormControl(false)));
          this.drinkService.triggerRefreshList();
          alert('Bebida creada exitosamente');
        },
        (error) => {
          console.error('Error al crear la bebida:', error);
          alert('Error al crear la bebida');
        }
      );
    }
  }
} 