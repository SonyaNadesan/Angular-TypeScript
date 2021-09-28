import { Component } from '@angular/core';
import { KeyValuePair } from './components/KeyValuePair';

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
  options:KeyValuePair<number, string>[] = [
    new KeyValuePair<number, string>(1, "a"),
    new KeyValuePair<number, string>(2, "b"),
    new KeyValuePair<number, string>(3, "c"),
  ];

  checkboxGroupTitle: string = "Checkboxes!";
  checkboxOptions: KeyValuePair<number, string>[] = [
    new KeyValuePair<number, string>(1, "a"),
    new KeyValuePair<number, string>(2, "b"),
    new KeyValuePair<number, string>(3, "c"),
  ];

  radioButtonGroupTitle: string = "Radio Buttons!";
  radioButtonGroup:string = "RadioButtonGroup";
  radioButtonOptions: KeyValuePair<number, string>[] = [
    new KeyValuePair<number, string>(1, "a"),
    new KeyValuePair<number, string>(2, "b"),
    new KeyValuePair<number, string>(3, "c"),
  ];

  columns: KeyValuePair<string, string>[] = [
    new KeyValuePair<string, string>("name", "First Name"),
    new KeyValuePair<string, string>("age", "Age")
  ];
  items: any[] = [
    { name: 'Sonya', age: 25, colour:'blue'},
    { name: 'Sofya', age: 25, colour:'red'},
    { name: 'Faith', age: 28, colour:'yellow'}
  ];

  firstCombo(event: KeyValuePair<number, string>){
    alert(event.value);
  }

  secondCombo(event: KeyValuePair<number, string>){
    alert("Hello " + event.value);
  }

  checkboxExample(event: KeyValuePair<number, string>[]){
    alert(event.map(x => x.value).join());
  }

  radioButtonExample(event: KeyValuePair<number, string>){
    alert("radio...." + event.value);
  }
}
