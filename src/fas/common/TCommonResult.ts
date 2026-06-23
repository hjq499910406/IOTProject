
// 返回值
export class TCommonResult {
  ActionID?: string;   
  ActionCode?: string;   
  ActionName?: string;   
  ResultType?: number;   
  EntityType?: number;   
  DataContent?: string;   
  Record?:Any;
  List?:Array;
  Count?:number;
  constructor(){
    this.ActionID = null;
    this.ActionCode = null;
    this.ActionName = null;
    this.ResultType = null;
    this.EntityType = null;
    this.DataContent = null;
    this.Record = null;
    this.List = null;
    this.Count = null;
  }
}
