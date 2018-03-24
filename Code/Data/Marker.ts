export { Marker }

import * as TBX from "engineer-js";

class Marker
{
    private _Type:string;
    private _QuestID:string;
    public get Type():string { return this._Type; }
    public get QuestID():string { return this._QuestID; }
    public constructor(Old?:Marker)
    {
        if(Old)
        {
            this._Type = Old._Type;
            this._QuestID = Old._QuestID;
        }
        else
        {
            this._Type = "Treasure";
            this._QuestID = "Empty";
        }
    }
    public Copy() : Marker
    {
        return new Marker(this);
    }
    public Deserialize(Data:any) : void
    {
        if(Data.Type && Data.QuestID)
        {
            this._Type = Data.Type;
            this._QuestID = Data.QuestID;
        }
        else TBX.Log.Error("Marker Deserialize Failed!", Data, "Narbu_Data");
    }
}