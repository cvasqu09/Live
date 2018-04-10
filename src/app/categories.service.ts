import { Injectable } from '@angular/core';

@Injectable()
export class CategoriesService {

  public baseUrl: string = "";
  public categories: any[] = [
    {
      "name": "Chess",
      "id": "check-tag",
      "icon": "chess-event-48.png"
    },
    {
      "name": "Baseball",
      "id": "baseball-tag",
      "icon": "assets/markers/baseball-event-48.png"
    },
    {
      "name": "Volleyball",
      "id": "volleyball-tag",
      "icon": ""
    },
    {
      "name": "Disc Golf",
      "id": "disc-golf-tag",
      "icon": ""
    },
    {
      "name": "Basketball",
      "id": "basketball-tag",
      "icon": ""
    }
  ];

  constructor() { }

}
