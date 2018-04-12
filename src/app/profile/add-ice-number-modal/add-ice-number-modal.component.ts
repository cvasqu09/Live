import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-ice-number-modal',
  templateUrl: './add-ice-number-modal.component.html',
  styleUrls: ['./add-ice-number-modal.component.css']
})
export class AddIceNumberModalComponent implements OnInit {
  phoneNumber: string;
	selectedProvider: string = "Provider";
	readonly providers: Array<string> = ["ATT", "Verizon", "Sprint", "T-Mobile"];

  constructor() { }

  ngOnInit() {
  }

  updateProviderButton(provider){
  	this.selectedProvider = provider;
  }

  getProviderClass() {
  	switch (this.selectedProvider) {
  		case "ATT":
  			return 'att';
  		case "Verizon":
  			return 'verizon';
  		case "Sprint":
  			return 'sprint';
  		case "T-Mobile":
  			return 'tmobile';
  		default:
  			return ""
  	}
  }

  validState() {
    if(this.phoneNumber == null){
      return false
    }

    this.phoneNumber = this.phoneNumber.replace(/\-/g, '').replace(/\(/g, '').replace(/\)/g, '').replace(/ /g, '');
    if(this.phoneNumber.length == 10 && !isNaN(Number(this.phoneNumber)) && this.providers.includes(this.selectedProvider)){
      return true;
    }
    return false
  }

  onSaveChanges()

}
