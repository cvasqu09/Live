import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-category-modal',
	templateUrl: './category-modal.component.html',
	styleUrls: ['./category-modal.component.css']
})
export class CategoryModalComponent implements OnInit {
	@Input() openModal: boolean; 
	categories: Array<string> = ['chess', 'basketball', 'sports', 'music', 'fifth'] // TODO: Change this to use central category list
	@Input() selectedCategories: Array<string>;
	updateCategories: Array<string>
	numRowsNeeded: Array<number>;

	constructor() { }

	ngOnInit() {
		this.numRowsNeeded = new Array(Math.ceil(this.categories.length / 2)).fill(0).map((e, i) => i)
		console.log(this.numRowsNeeded.length)
	}

	ngOnChanges() {
		if(this.selectedCategories != null  && this.selectedCategories.length){

		}
	}

	getButtonType(category): string {
		if(this.selectedCategories == null){
			return 'btn-secondary';
		} else if(this.selectedCategories.includes(category)){
			return 'btn-success';
		} else {
			return 'btn-secondary';
		}
	}

	onSelected(category): void {
		if(this.selectedCategories.includes(category)){
			const index = this.selectedCategories.indexOf(category)
			this.selectedCategories.splice(index, 1);
		} else {
			this.selectedCategories.push(category)
		}
	}

	categoryExistsForIndex(index): boolean {
		return index < this.categories.length ? true : false;
	}




}
