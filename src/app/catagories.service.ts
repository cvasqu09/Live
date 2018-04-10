import { Injectable } from '@angular/core';

@Injectable()
export class CatagoriesService {

  public catagories: any[] = [
    {
      "name": "Chess",
      "id": "check-tag",
      "icon": ""
    },
    {
      "name": "Baseball",
      "id": "baseball-tag",
      "icon": ""
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
  ]; // TODO: Generalize this object for the entire project

  constructor() { }

}
