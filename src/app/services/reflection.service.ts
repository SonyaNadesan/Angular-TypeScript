import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReflectionService {

  constructor() { }

  getProperties<T>(data: T[]): string[] {
    let properties: string[] = [];

    let propertyList = Object.entries(data[0]);

    for (const [propertyKey, propertyValue] of propertyList) {
      properties.push(propertyKey);
    }

    return properties;
  }

  getPropertiesOfSingleObject(anObject: any) {
    let properties: string[] = [];

    let propertyList = Object.entries(anObject);

    for (const [propertyKey, propertyValue] of propertyList) {
      properties.push(propertyKey);
    }

    return properties;
  }
}