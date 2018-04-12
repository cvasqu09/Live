import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../categories.service';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {
	private presetCategories: any[];
  constructor(
    private mainCategories: CategoriesService
  ) { }

  ngOnInit() {
    this.presetCategories = this.mainCategories.categories;
  }

}
