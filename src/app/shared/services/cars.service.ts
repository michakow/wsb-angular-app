import { Injectable, inject } from '@angular/core';
import { Car } from '../types';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CarsService {
  private httpClient = inject(HttpClient);

  private apiUrl = 'http://localhost:3000';

  selectedCarId = '';

  selectCar(id: string) {
    this.selectedCarId = id;
  }

  getCars() {
    return this.httpClient.get<{ message: string; cars: Car[] }>(
      `${this.apiUrl}/cars`
    );
  }

  getCar() {
    return this.httpClient.get<{ message: string; car: Car }>(
      `${this.apiUrl}/cars/${this.selectedCarId}`
    );
  }

  deleteCar(id: string) {
    return this.httpClient.delete(`${this.apiUrl}/cars/${id}`);
  }

  addCar(body: Car) {
    return this.httpClient.post(`${this.apiUrl}/cars`, body);
  }

  updateCar(body: Car) {
    return this.httpClient.put(
      `${this.apiUrl}/cars/${this.selectedCarId}`,
      body
    );
  }
}
