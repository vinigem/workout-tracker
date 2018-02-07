import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../http.service';
import { AlertService } from '../alert/alert.service';
import { Workout } from './workout';

@Component({
  templateUrl: './edit-workout.component.html'
})
export class EditWorkoutComponent implements OnInit {

  workoutForm: FormGroup;
  submitted: boolean;
  categories: Array<string>;
  newCategory: string;
  invalidCategory: boolean;
  openAddCategory: boolean;
  idx: number;
  workout: Workout;

  constructor(private route: ActivatedRoute, private fb: FormBuilder,
    private httpService: HttpService, private alertService: AlertService) { 
    this.categories = this.httpService.getCategories();
    
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
       this.idx = +params['workout'];
       this.workout = this.httpService.getWorkouts()[this.idx];
       this.createForm();
    });
  }

  createForm() {
    this.workoutForm = this.fb.group({
      title: [this.workout.title],
      note: [this.workout.note],
      category: [this.workout.category, Validators.required]
    });
  }

  update(model: Workout, isValid: boolean) {
    this.submitted = true; 
    if(isValid) {
      const status = this.httpService.updateWorkout(model, this.idx);
      if(status) {
        this.alertService.addAlert('Workout updated successfully..!!', 'success');
      }
    }
  }

  addCategory(): void {
    if(this.newCategory && this.newCategory.length > 0) {
      const status = this.httpService.saveCategory(this.newCategory);
      if(status) {
        this.alertService.addAlert('Category added successfully..!!', 'success');
        this.categories = this.httpService.getCategories();
        this.newCategory = null;
        this.openAddCategory = false;
      } else {
        this.alertService.addAlert('Category already exists..!!', 'error');
      }
      
    } else {
      this.invalidCategory = true;
    }
  }
  
}