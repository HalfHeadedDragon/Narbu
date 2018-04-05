export { Roster }

import * as TBX from "engineer-js";

import { Character } from "./Character";

class Roster
{
    private _Size:number;
    private _Characters:Character[];
    public get Size():number { return this._Size; }
    public get Characters():Character[] { return this._Characters; }
    public constructor(Old?:Roster)
    {
        this._Characters = [];
        if(Old)
        {
            this._Size = Old._Size;
            for(let i in Old._Characters) this._Characters.push(Old._Characters[i]);
        }
        else
        {
            this._Size = 10;
        }
    }
    public Copy() : Roster
    {
        return new Roster(this);
    }
    public Deserialize(Data:any) : boolean
    {
        if(Data.Size && Data.Characters)
        {
            this._Size = Data.Size;
            for(let i in Data.Characters)
            {
                let NewCharacter:Character = new Character();
                if(!NewCharacter.Deserialize(Data.Characters[i])) continue;
                this._Characters.push(NewCharacter);
            }
            return true;
        }
        else
        {
            TBX.Log.Error("Roster Deserialize Failed!", Data, "Narbu_Data");
            return false;
        }
    }
}