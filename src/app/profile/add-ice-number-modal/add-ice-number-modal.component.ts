import { Component, OnInit } from '@angular/core';
import { ICENumber } from '../../ice-number/ice-number.model';
import { UserService } from '../../user/user.service';
import { ToasterService } from '../../toaster/toaster.service';
import { ToasterNotification } from '../../toaster/toaster-notification.model';
import { User } from '../../user/user.model';

@Component({
  selector: 'app-add-ice-number-modal',
  templateUrl: './add-ice-number-modal.component.html',
  styleUrls: ['./add-ice-number-modal.component.css']
})
export class AddIceNumberModalComponent implements OnInit {
  phoneNumber: string;
	selectedProvider: string = "Provider";
	readonly providers: Array<string> = ["ATT", "Verizon", "Sprint", "T-Mobile"];

  constructor(private userService: UserService, private toasterService: ToasterService) { }

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

  onSaveChanges(){
    const newIceNumber = new ICENumber(this.phoneNumber, this.getProviderClass(), false)
    const userId: string = localStorage.getItem('user_id');
    let user: User;
    console.log(userId)
    if(userId != null && userId !== "") {
      this.userService.getUserInfo(userId).subscribe(usr => {
        console.log("user call" + JSON.stringify(usr));
        user = usr;
        this.userService.addICENumber(user, newIceNumber).subscribe(res => {
          const returnedUser = res;
          const notification = new ToasterNotification('Success', 'You added a new emergency contact', ToasterNotification.SUCCESS);
          this.toasterService.sendNotification(notification);
        }, err => {
          const notification = new ToasterNotification('Error', 'There was an issue updating your emergency contacts. Please try again later.', ToasterNotification.ERROR);
          this.toasterService.sendNotification(notification);
        })
      }, err => {
        const notification = new ToasterNotification('Error', 'Could not retrieve user info', ToasterNotification.ERROR)
        this.toasterService.sendNotification(notification)
      })
    } else {
      const notification = new ToasterNotification('Error', 'Could get user ID. Your session may have expired', ToasterNotification.ERROR);
      this.toasterService.sendNotification(notification)
      return;
    }
  }

}
