import CustomStore from "devextreme/data/custom_store";
import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';;

export class PivotGridDataSourceBuilder{
    private pivotGridDataSource: PivotGridDataSource;

    private fields: any[] = [];
    private store: any = {};
    private remoteOperations: boolean = false;

    setFields(fields: any[]): PivotGridDataSourceBuilder{
        this.fields = fields;
        console.log("setting fields");
        return this;
    }

    setData<T>(data: T[]): PivotGridDataSourceBuilder{
        this.store.load = (e) => {
            console.log("setting data");
            return data;
        };

        return this;
    }

    disableLocalCache(): PivotGridDataSourceBuilder{
        this.store.loadMode = "raw";
        this.store.cacheRawData = false;
        console.log("setting loadMode and cacheRawData");
        return this;
    }

    enableRemoteOperations(enable: boolean = true){
        this.remoteOperations = enable;
        console.log("setting remoteOperations");
        return this;
    }
    
    build(key: string): PivotGridDataSource{
        this.store.key = key;

        this.pivotGridDataSource = new PivotGridDataSource({ 
            fields: this.fields, 
            store: new CustomStore(this.store), 
            remoteOperations: this.remoteOperations 
        });

        console.log("building");
        return this.pivotGridDataSource;
    }
}