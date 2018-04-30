import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CategoriesService } from '../../categories.service';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {
	private unselectedCategories: any[];
  private selectedCategories: any[];
  @Output() categoriesChanged: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private mainCategories: CategoriesService
  ) { }

  ngOnInit() {
    this.unselectedCategories = this.mainCategories.categories.slice();
    this.selectedCategories = [];
  }

  onSelectCategory(category) {
    this.unselectedCategories.splice(this.unselectedCategories.indexOf(category), 1);
    this.selectedCategories.push(category);
    this.emitCategories();
  }

  onRemoveCategory(category) {
    this.selectedCategories.splice(this.selectedCategories.indexOf(category), 1);
    this.unselectedCategories.push(category);
    this.emitCategories();
  }

  emitCategories() {
    this.categoriesChanged.emit(this.selectedCategories);
  }

}
