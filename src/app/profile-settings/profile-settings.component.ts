import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})

export class ProfileSettingsComponent implements OnInit {

  @ViewChild('openCreateUserModal') openCreateUserModal:ElementRef;

  public settingsRequest = false;
  public userCatagories = [];
  public userICENumber: string = "";
  public userProvider: string = "";
  public catagories: any[] = [
    {
      "name": "Chess",
      "id": "check-tag"
    },
    {
      "name": "Baseball",
      "id": "baseball-tag"
    },
    {
      "name": "Volleyball",
      "id": "volleyball-tag"
    },
    {
      "name": "Disc Golf",
      "id": "disc-golf-tag"
    }
  ]; // TODO: Generalize this object for the entire project
  public providers: any[] = [
    {"name" : "att"},
    {"name" : "verizon"},
    {"name" : "tmobile"},
    {"name" : "sprint"}
  ];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.openCreateUserModal.nativeElement.click();
  }

  triggerNewUserModal(val): void {

    this.settingsRequest = val;
  }

  changeSettingsRequested(): boolean{
    return this.settingsRequest;
  }

  catagorySelected(catagory): void {

    if (this.userCatagories.includes(catagory)){
      this.userCatagories.splice(this.userCatagories.indexOf(catagory),1);
    }
    else {
      this.userCatagories.push(catagory);
    }
  }

  providerSelected(provider): void {

    this.userProvider = provider;

  }

  submitNewUser(): void {

    var fullName =  (<HTMLInputElement>document.getElementById("fName")).value + " " +(<HTMLInputElement>document.getElementById("lName")).value;
    this.userICENumber =  (<HTMLInputElement>document.getElementById("iceNumber")).value.replace(/\-/g, '').replace(/\(/g, '').replace(/\)/g, '');

    const newUser = new User(fullName, this.userCatagories, [], 0, [{ "phoneNumber" : this.userICENumber, "provider": this.userProvider, "confirmed" : true}], localStorage.getItem("user_id"));
    console.log(newUser);
    this.userService.createUser(newUser).subscribe(
      response => {
        console.log(response);
      }
    );
  }
}
