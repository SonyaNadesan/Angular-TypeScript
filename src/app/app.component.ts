import { Component } from '@angular/core';
import { TextValuePair } from './components/TextValuePair';
import { FromAndToDate } from './models/FromAndToDate';
import { DateRangeRules } from './services/DateRange/Rules/DateRangeRules';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  numberOfPages: number = 21;
  startPage:number = 1;
  lastPage:number = 10;
  currentPage:number = 1;
  maxNumberOfPagesToShowOnEachRequest: number = 10;

  label:string = "Select an Option";
  options:TextValuePair<number, string>[] = [
    new TextValuePair<number, string>(1, "a"),
    new TextValuePair<number, string>(2, "b"),
    new TextValuePair<number, string>(3, "c"),
  ];

  checkboxGroupTitle: string = "Checkboxes!";
  checkboxOptions: TextValuePair<number, string>[] = [
    new TextValuePair<number, string>(1, "a"),
    new TextValuePair<number, string>(2, "b"),
    new TextValuePair<number, string>(3, "c"),
  ];

  radioButtonGroupTitle: string = "Radio Buttons!";
  radioButtonGroup:string = "RadioButtonGroup";
  radioButtonOptions: TextValuePair<number, string>[] = [
    new TextValuePair<number, string>(1, "a"),
    new TextValuePair<number, string>(2, "b"),
    new TextValuePair<number, string>(3, "c"),
  ];

  columns: TextValuePair<string, string>[] = [
    new TextValuePair<string, string>("First Name", "name"),
    new TextValuePair<string, string>("Age", "age")
  ];
  items: any[] = [
    new Person('Sonya',  25, 'blue'),
    new Person('Sofya',  25, 'red'),
    new Person('Faith',  28, 'yellow'),
  ];

  dateRangeRule: DateRangeRules = DateRangeRules.Past;

  firstCombo(event: TextValuePair<number, string>){
    alert(event.value);
  }

  secondCombo(event: TextValuePair<number, string>){
    alert("Hello " + event.value);
  }

  checkboxExample(event: TextValuePair<number, string>[]){
    alert(event.map(x => x.value).join());
  }

  radioButtonExample(event: TextValuePair<number, string>){
    alert("radio...." + event.value);
  }

  rowClick(item: Person){
    alert(item.colour);
  }

  onDateRangeChanged(event: FromAndToDate){
    alert(event.isValid ? "Valid" : event.message);
  }
}

export class Person{
  name: string;
  age: number;
  colour: string;

  constructor(name: string, age: number, colour:string) {
    this.name = name;
    this.age = age;
    this.colour = colour;
  }
}
