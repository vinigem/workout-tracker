import { Component } from '@angular/core';
import { HttpService } from '../http.service';
import { AlertService } from '../alert/alert.service';

@Component({
  templateUrl: './create-category.component.html'
})
export class CreateCategoryComponent {

  categories: Array<any>;
  newCategory: string;
  invalid: boolean;
    
  constructor(private httpService: HttpService, private alertService: AlertService) { 
    this.getCategories();
  }

  addCategory(): void {
    if(this.newCategory && this.newCategory.length > 0) {
      const status = this.httpService.saveCategory(this.newCategory);
      if(status) {
        this.alertService.addAlert('Category updated successfully..!!', 'success');
        this.getCategories();
        this.newCategory = null;
      } else {
        this.alertService.addAlert('Category already exists..!!', 'error');
      }
      
    } else {
      this.invalid = true;
    }
  }

  update(category: string, idx: number): void {
    const status = this.httpService.updateCategory(category, idx);
    if(status) {
      this.alertService.addAlert('Category updated successfully..!!', 'success');
    }
  }

  delete(idx: number): void {
    const status = this.httpService.deleteCategory(idx);
    if(status) {
      this.alertService.addAlert('Category deleted successfully..!!', 'success');
      this.getCategories();
    }
  }

  getCategories(): void {
    this.categories = new Array<any>();
    this.httpService.getCategories().forEach(category => {
      this.categories.push({name: category, editable: false});
    });
  }

  filterCategories(search: string) : void {
    this.categories = new Array<any>();
    this.httpService.getCategories().filter(category => {
      return category.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    }).forEach(category => {
      this.categories.push({name: category, editable: false});
    });
  }
 
}