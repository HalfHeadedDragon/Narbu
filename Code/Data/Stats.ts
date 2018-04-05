export { Stats }

import * as TBX from "engineer-js";

class Stats
{
    private _Attack:number;
    private _Defence:number;
    private _Health:number;
    public get Attack():number { return this._Attack; }
    public set Attack(value:number) { this._Attack = value; }
    public get Defence():number { return this._Defence; }
    public set Defence(value:number) { this._Defence = value; }
    public get Health():number { return this._Health; }
    public set Health(value:number) { this._Health = value; }
    public constructor(Old?:Stats)
    {
        if(Old)
        {
            this._Attack = Old._Attack;
            this._Defence = Old._Defence;
            this._Health = Old._Health;
        }
        else
        {
            this._Attack = 20;
            this._Defence = 1;
            this._Health = 1;
        }
    }
    public Copy() : Stats
    {
        return new Stats(this);
    }
    public Multiply(Factor:number) : Stats
    {
        this._Attack *= Factor;
        this._Defence *= Factor;
        this._Health *= Factor;
        return this;
    } 
    public Add(Other:Stats) : Stats
    {
        this._Attack += Other._Attack;
        this._Defence += Other._Defence;
        this._Health += Other._Health;
        return this;
    } 
    public Deserialize(Data:any) : boolean
    {
        if(Data.Attack != undefined && Data.Defence != undefined && Data.Health != undefined)
        {
            this._Attack = Data.Attack;
            this._Defence = Data.Defence;
            this._Health = Data.Health;
            return true;
        }
        else
        {
            TBX.Log.Error("Stats Deserialize Failed!", Data, "Narbu_Data");
            return false;
        }
    }
}