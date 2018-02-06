import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Workout } from './workout';

@Component({
  templateUrl: './edit-workout.component.html'
})
export class EditWorkoutComponent {

  workoutForm: FormGroup;
  submitted: boolean;

  constructor(private fb: FormBuilder) { 
    this.createForm();
  }

  createForm() {
    this.workoutForm = this.fb.group({
      title: ['', Validators.required ],
      note: [''],
      calories: [0, Validators.min(0)],
    });
  }

  incrementCalories(): void {
    const calories = this.workoutForm.controls['calories'].value;
    this.workoutForm.controls['calories'].setValue(calories + 0.1, { onlySelf: true });
  }

  decrementCalories(): void {
    const calories = this.workoutForm.controls['calories'].value;
    this.workoutForm.controls['calories'].setValue(calories - 0.1, { onlySelf: true });
  }

  update(model: Workout, isValid: boolean) {
    this.submitted = true; 
    console.log(model, isValid);
  }
  
}