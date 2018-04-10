import { Component, OnInit } from '@angular/core';
import { CatagoriesService } from '../../catagories.service';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {
	private presetCategories: any[];
  constructor(
    private mainCatagories: CatagoriesService
  ) { }

  ngOnInit() {
    this.presetCategories = this.mainCatagories.catagories;
  }

}
