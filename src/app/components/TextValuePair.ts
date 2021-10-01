export class TextValuePair<TText, TValue>{
    text: TText;
    value: TValue;

    constructor(text: TText, value:TValue){
        this.text = text;
        this.value = value;
    }
}