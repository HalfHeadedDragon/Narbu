export { Status }

import * as TBX from "engineer-js";

class Status
{
    private _Stop:number;
    public get Stop():number { return this._Stop; }
    public set Stop(value:number) { this._Stop = value; }
    public constructor(Old?:Status)
    {
        if(Old)
        {
            this._Stop = Old._Stop;
        }
        else
        {
            this._Stop = 0;
        }
    }
    public Copy() : Status
    {
        return new Status(this);
    }
    public Deserialize(Data:any) : void
    {
        if(Data.Stop)
        {
            this._Stop = Data.Stop;
        }
        else TBX.Log.Error("Status Deserialize Failed!", Data, "Narbu_Data");
    }
}