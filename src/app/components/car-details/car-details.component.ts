import { Component, OnInit, inject } from '@angular/core';
import { CarsService } from '../../shared/services';
import { Router } from '@angular/router';
import { take, tap } from 'rxjs';
import { Car } from '../../shared/types';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-car-details',
  standalone: true,
  imports: [DatePipe],
  template: `
    <div class="flex flex-col justify-center items-center w-full p-4">
      @if (isCarSelected) {
      <p class="text-3xl font-bold !mb-9">Szczegóły samochodu</p>
      <div>
        <div class="flex gap-2">
          <p class="font-bold">Model:</p>
          <p>{{ car?.model }}</p>
        </div>
        <div class="flex gap-2">
          <p class="font-bold">Producent:</p>
          <p>{{ car?.producent }}</p>
        </div>
        <div class="flex gap-2">
          <p class="font-bold">Rok produkcji:</p>
          <p>{{ car?.year | date : 'dd/MM/yyyy' }}</p>
        </div>
        <div class="flex gap-2">
          <p class="font-bold">Waga:</p>
          <p>{{ car?.weight }}</p>
        </div>
      </div>
      <div class="flex gap-4">
        <button (click)="editCar()" class="rounded p-2 bg-blue-300 mb-9 mt-6">
          Edytuj
        </button>
        <button (click)="deleteCar()" class="rounded p-2 bg-blue-300 mb-9 mt-6">
          Usuń
        </button>
        <button
          (click)="navigateToList()"
          class="rounded p-2 bg-blue-300 mb-9 mt-6"
        >
          Powrót do strony głównej
        </button>
      </div>
      } @else {
      <p class="text-3xl font-bold !mb-9">
        Samochód nie istnieje lub nie został wybrany
      </p>
      <button
        (click)="navigateToList()"
        class="rounded p-2 bg-blue-300 mb-9 mt-6"
      >
        Powrót do strony głównej
      </button>
      }
    </div>
  `,
})
export class CarDetailsComponent implements OnInit {
  private carsService = inject(CarsService);
  private router = inject(Router);

  isCarSelected = this.carsService.selectedCarId;
  car!: Car;

  ngOnInit() {
    this.carsService
      .getCar()
      .pipe(
        take(1),
        tap((res) => {
          this.car = res.car;
        })
      )
      .subscribe();
  }

  navigateToList() {
    this.router.navigate(['cars']);
  }

  editCar() {
    this.router.navigate(['cars', 'edit']);
  }

  deleteCar() {
    this.carsService
      .deleteCar(this.car._id!)
      .pipe(
        take(1),
        tap(() => {
          this.navigateToList();
        })
      )
      .subscribe();
  }
}
