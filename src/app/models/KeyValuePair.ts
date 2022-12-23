export class KeyValuePair<TKey, TValue>{
    key: TKey;
    value: TValue;

    constructor(_key: TKey, _value: TValue){
         this.key = _key;
         this.value = _value;
    }
}