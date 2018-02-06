import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../http.service';
import { AlertService } from '../alert/alert.service';
import { Workout } from './workout';

@Component({
  templateUrl: './create-workout.component.html'
})
export class CreateWorkoutComponent {

  workoutForm: FormGroup;
  submitted: boolean;
  categories: Array<string>;

  constructor(private fb: FormBuilder, private httpService: HttpService, private alertService: AlertService) { 
    this.createForm();
    this.categories = this.httpService.getCategories();
  }

  createForm() {
    this.workoutForm = this.fb.group({
      title: ['', Validators.required ],
      note: [''],
      calories: [0, Validators.min(0.1)],
      category: ['', Validators.required]
    });
  }

  incrementCalories(): void {
    const calories = parseFloat((this.workoutForm.controls['calories'].value + 0.1).toFixed(1));
    this.workoutForm.controls['calories'].setValue(calories);
  }

  decrementCalories(): void {
    const calories = parseFloat((this.workoutForm.controls['calories'].value - 0.1).toFixed(1));
    if(calories >= 0) {
      this.workoutForm.controls['calories'].setValue(calories);
    }
    
  }

  save(model: Workout, isValid: boolean) {
    this.submitted = true; 
    if(isValid) {
      const status = this.httpService.saveWorkout(model);
      if(status) {
        this.alertService.addAlert('Workout added successfully..!!', 'success');
      } else {
        this.alertService.addAlert('Workout already exists!!', 'error');
      }
      
    }
  }
  
}