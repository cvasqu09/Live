import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../user/user.service';
import { ToasterNotification } from '../../toaster/toaster-notification.model'
import { ToasterService } from '../../toaster/toaster.service'

@Component({
	selector: 'app-category-modal',
	templateUrl: './category-modal.component.html',
	styleUrls: ['./category-modal.component.css']
})
export class CategoryModalComponent implements OnInit {
	@Input() openModal: boolean; 
	@Input() selectedCategories: Array<string>;
	@Output() categoriesUpdated: EventEmitter< Array<string> > = new EventEmitter< Array<string> >();
	categories: Array<string> = ['chess', 'basketball', 'sports', 'music', 'fifth'] // TODO: Change this to use central category list
	updateCategories: Array<string>
	numRowsNeeded: Array<number>;
	categoriesBuffer: Array<string>;

	constructor(private userService: UserService, private toasterService: ToasterService) { }

	ngOnInit() {
		this.numRowsNeeded = new Array(Math.ceil(this.categories.length / 2)).fill(0).map((e, i) => i)
	}

	ngOnChanges() {
		if(this.selectedCategories != null  && this.selectedCategories.length){
			this.categoriesBuffer = this.selectedCategories.slice();
		}
	}

	getButtonType(category): string {
		if(this.categoriesBuffer == null){
			return 'btn-secondary';
		} else if(this.categoriesBuffer.includes(category)){
			return 'btn-success';
		} else {
			return 'btn-secondary';
		}
	}

	onSelected(category): void {
		if(this.categoriesBuffer.includes(category)){
			const index = this.categoriesBuffer.indexOf(category)
			this.categoriesBuffer.splice(index, 1);
		} else {
			this.categoriesBuffer.push(category)
		}
	}

	categoryExistsForIndex(index): boolean {
		return index < this.categories.length ? true : false;
	}

	validState(): boolean {
		return this.categoriesBuffer != null && this.categoriesBuffer.length != 0;
	}

	onSaveChanges() {
		const userId = localStorage.getItem('user_id')
		
		console.log("editing categories")
    // Logic for sending edited user information
    var changes: Object = {};

    // Initialize changes object to have selected categories and current Ice numbers
    changes = { "categories": this.categoriesBuffer }

    this.userService.editUser(userId, changes).subscribe(user => {
      // use toaster service to create a success alert
      const notification: ToasterNotification = new ToasterNotification("Success", "Boo Yah! Your changes have been made.", ToasterNotification.SUCCESS)
      this.toasterService.sendNotification(notification)

      // update selected categories in parent component to display updated results
      this.categoriesUpdated.emit(this.categoriesBuffer)

    }, err => {
      // user toaster service to create a error alert
      const notification: ToasterNotification = new ToasterNotification("Error", "Sorry, I could not save your changes.", ToasterNotification.ERROR)
      this.toasterService.sendNotification(notification)

    })
	}



}
