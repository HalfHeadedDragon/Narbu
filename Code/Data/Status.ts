export { Status }

import * as TBX from "engineer-js";

class Status
{
    private _Stop:number;
    private _QuestID:string;
    private _Color:TBX.Color;
    public get Stop():number { return this._Stop; }
    public set Stop(value:number) { this._Stop = value; }
    public get QuestID():string { return this._QuestID; }
    public set QuestID(value:string) { this._QuestID = value; }
    public get Color():TBX.Color { return this._Color; }
    public set Color(value:TBX.Color) { this._Color = value; }
    public constructor(Old?:Status)
    {
        if(Old)
        {
            this._Stop = Old._Stop;
            this._QuestID = Old._QuestID;
            this._Color = Old._Color.Copy();
        }
        else
        {
            this._Stop = 0;
            this._QuestID = "";
            this._Color = TBX.Color.FromString("#888888");
        }
    }
    public Copy() : Status
    {
        return new Status(this);
    }
    public Deserialize(Data:any) : boolean
    {
        if(Data.Stop)
        {
            this._Stop = Data.Stop;
            if(Data.QuestID) this._QuestID = Data.QuestID;
            if(Data.Color) this._Color.Deserialize(Data.Color);
            return true;
        }
        else
        {
            TBX.Log.Error("Status Deserialize Failed!", Data, "Narbu_Data");
            return false;
        }
    }
}