import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Workout } from './workout/workout';

const SUCCESS = true;
const ERROR = false;

@Injectable()
export class HttpService {

    constructor(private httpClient: HttpClient) {}

    getCategories(): Array<string> {
        let categories = new Array<string>();
        const existingCategories = localStorage.getItem('categories');
        if(null !== existingCategories) {
            categories = JSON.parse(existingCategories);
        }
        return categories;
    }

    saveCategory(category: string): boolean {
        let categories = this.getCategories();
        if(categories.indexOf(category) === -1) {
            categories.push(category);
            localStorage.setItem('categories', JSON.stringify(categories));
            return SUCCESS
        } else {
            return ERROR;
        }
    }

    updateCategory(category: string, idx: number): boolean {
        let categories = this.getCategories();
        categories[idx] = category;
        localStorage.setItem('categories', JSON.stringify(categories));
        return SUCCESS;
    }

    deleteCategory(idx: number): boolean {
        let categories = this.getCategories();
        categories.splice(idx, 1);
        localStorage.setItem('categories', JSON.stringify(categories));
        return SUCCESS;
    }

    getWorkouts(): Array<Workout> {
        let workouts = new Array<Workout>();
        const existingWorkouts = localStorage.getItem('workouts');
        if(null !== existingWorkouts) {
            workouts = JSON.parse(existingWorkouts);
        }
        return workouts;
    }

    saveWorkout(workout: Workout): boolean {
        let workouts = this.getWorkouts();
        if(workouts.filter(existingWorkout => existingWorkout.title === workout.title).length <= 0) {
            workouts.push(workout);
            localStorage.setItem('workouts', JSON.stringify(workouts));
            return SUCCESS;
        } else {
            return ERROR;
        }
    }

    updateWorkout(workout: Workout, idx: number): boolean {
        let workouts = this.getWorkouts();
        workouts[idx] = workout;
        localStorage.setItem('workouts', JSON.stringify(workouts));
        return SUCCESS;
    }

    deleteWorkout(idx: number): boolean {
        let workouts = this.getWorkouts();
        workouts.splice(idx, 1);
        localStorage.setItem('workouts', JSON.stringify(workouts));
        return SUCCESS;
    }

    getWorkoutEntries(): Array<any> {
        let workoutEntries = new Array<any>();
        const existingWorkoutEntries = localStorage.getItem('workoutEntries');
        if(null !== existingWorkoutEntries) {
            workoutEntries = JSON.parse(existingWorkoutEntries);
        }
        return workoutEntries;
    }

    saveWorkoutEntry(workoutEntry: any): void {
        let workoutEntries = this.getWorkoutEntries();
        workoutEntries.push(workoutEntry);
        localStorage.setItem('workoutEntries', JSON.stringify(workoutEntries));
    }

    updateWorkoutEntry(workoutEntry: any): void {
        let workoutEntries = this.getWorkoutEntries();
        let index = workoutEntries.findIndex(existingWorkoutEntry => {
           return existingWorkoutEntry.title === workoutEntry.title
            && existingWorkoutEntry.startDate === workoutEntry.startDate
            && existingWorkoutEntry.startTime === workoutEntry.startTime
        });

        if(index >= 0) {
            workoutEntries[index] = workoutEntry;
            localStorage.setItem('workoutEntries', JSON.stringify(workoutEntries));
        }
    }

}