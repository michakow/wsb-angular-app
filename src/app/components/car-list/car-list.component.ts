import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { CarsService } from '../../shared/services';
import { MatTableModule } from '@angular/material/table';
import { AsyncPipe, DatePipe } from '@angular/common';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car-list',
  standalone: true,
  imports: [MatTableModule, AsyncPipe, DatePipe],
  template: `<div class="flex flex-col justify-center items-center w-full p-4">
    <p class="text-3xl font-bold">Moje samochody</p>
    <button
      (click)="navigateToForm()"
      class="rounded p-2 bg-blue-300 mb-9 mt-6"
    >
      Dodaj nowy
    </button>
    <div class="w-3/4 max-w-[800px]">
      <table
        mat-table
        [dataSource]="(dataSource$ | async)!"
        class="mat-elevation-z8"
      >
        <ng-container matColumnDef="model">
          <th mat-header-cell *matHeaderCellDef>Model</th>
          <td mat-cell *matCellDef="let element">{{ element.model }}</td>
        </ng-container>

        <ng-container matColumnDef="producent">
          <th mat-header-cell *matHeaderCellDef>Producent</th>
          <td mat-cell *matCellDef="let element">{{ element.producent }}</td>
        </ng-container>

        <ng-container matColumnDef="year">
          <th mat-header-cell *matHeaderCellDef>Rok produkcji</th>
          <td mat-cell *matCellDef="let element">
            {{ element.year | date : 'dd/MM/yyyy' }}
          </td>
        </ng-container>

        <ng-container matColumnDef="action">
          <th mat-header-cell *matHeaderCellDef>Akcja</th>
          <td mat-cell *matCellDef="let element">
            <button
              (click)="navigateToDetails(element._id)"
              class="rounded border p-2"
            >
              Szczegóły
            </button>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
      </table>
    </div>
  </div>`,
})
export class CarListComponent {
  private carsService = inject(CarsService);
  private router = inject(Router);

  displayedColumns = ['model', 'producent', 'year', 'action'];
  dataSource$ = this.carsService.getCars().pipe(map((v) => v.cars));

  navigateToDetails(id: string) {
    this.carsService.selectCar(id);
    this.router.navigate(['cars', 'details']);
  }

  navigateToForm() {
    this.router.navigate(['cars', 'new']);
  }
}
