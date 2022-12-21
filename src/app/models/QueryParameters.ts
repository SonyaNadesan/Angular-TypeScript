import { KeyValuePair } from "./KeyValuePair";

export class QueryParameters{
  private parameters: KeyValuePair<string, any>[] = [];
  
  add(parameter: string, value: any){
    this.parameters.push(new KeyValuePair(parameter, value));
  }

  get(parameter: string){
    parameter = parameter.toLowerCase();

    return this.parameters.find(x => x.key.toLowerCase() == parameter).value;
  }

  getParameters(){
    return this.parameters;
  }

  buildQueryString(){
    let queryString = "";

    this.parameters.forEach(x => {
      if(queryString.length > 0){
        queryString = queryString + "&"
      }

      queryString = `${queryString}${x.key}=${x.value}`;
    });

    return queryString;
  }
}