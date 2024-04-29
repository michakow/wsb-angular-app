import { Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CarsService } from '../../shared/services';
import { Router } from '@angular/router';
import { take, tap } from 'rxjs';

@Component({
  selector: 'app-car-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatDatepickerModule],
  template: `<div class="flex flex-col justify-center items-center w-full p-4">
    <p class="text-3xl font-bold !mb-9">Nowy samochód</p>
    <form [formGroup]="form" class="example-form">
      <mat-form-field class="example-full-width">
        <mat-label>Model:</mat-label>
        <input
          type="text"
          matInput
          formControlName="model"
          placeholder="Wpisz nazwę.."
        />
        @if (form.controls.model.hasError('required')) {
        <mat-error>Pole wymagane</mat-error>
        }
      </mat-form-field>

      <mat-form-field class="example-full-width">
        <mat-label>Producent:</mat-label>
        <input
          type="text"
          matInput
          formControlName="producent"
          placeholder="Wpisz nazwę.."
        />
        @if (form.controls.producent.hasError('required')) {
        <mat-error>Pole wymagane</mat-error>
        }
      </mat-form-field>

      <mat-form-field class="example-full-width">
        <mat-label>Rok produkcji</mat-label>
        <input matInput [matDatepicker]="picker" formControlName="year" />
        @if (form.controls.year.hasError('required')) {
        <mat-error>Pole wymagane</mat-error>
        }
        <mat-datepicker-toggle
          matIconSuffix
          [for]="picker"
        ></mat-datepicker-toggle>
        <mat-datepicker #picker></mat-datepicker>
      </mat-form-field>

      <mat-form-field class="example-full-width">
        <mat-label>Waga:</mat-label>
        <input type="number" matInput formControlName="weight" />
        @if (form.controls.weight.hasError('required')) {
        <mat-error>Pole wymagane</mat-error>
        }
      </mat-form-field>

      <mat-form-field class="example-full-width">
        <mat-label>Kolor:</mat-label>
        <input type="color" matInput formControlName="color" />
        @if (form.controls.color.hasError('required')) {
        <mat-error>Pole wymagane</mat-error>
        }
      </mat-form-field>
    </form>
    <div class="flex gap-4">
      <button (click)="createCar()" class="rounded p-2 bg-blue-300 mb-9 mt-6">
        Dodaj nowy
      </button>
      <button
        (click)="navigateToList()"
        class="rounded p-2 bg-blue-300 mb-9 mt-6"
      >
        Powrót do strony głównej
      </button>
    </div>
  </div>`,
  styles: `.example-form {
    min-width: 150px;
    max-width: 500px;
    width: 100%;
  }
  
  .example-full-width {
    width: 100%;
  }`,
})
export class CarFormComponent {
  private fb = inject(NonNullableFormBuilder);
  private carsService = inject(CarsService);
  private router = inject(Router);

  form = this.fb.group({
    model: ['', Validators.required],
    year: [null as Date | null, Validators.required],
    producent: ['', Validators.required],
    weight: [0, Validators.required],
    color: ['', Validators.required],
  });

  navigateToList() {
    this.router.navigate(['cars']);
  }

  createCar() {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    const car = this.form.getRawValue();
    this.carsService
      .addCar(car)
      .pipe(
        take(1),
        tap(() => {
          this.navigateToList();
        })
      )
      .subscribe();
  }
}
