export { Character }

import * as TBX from "engineer-js";

import { Stats } from "./Stats";
import { ClassType, CharacterClass, CharacterClassPool } from "./CharacterClass";

class Character
{
    private _Level:number;
    private _Name:string;
    private _Class:ClassType;
    public get Level():number { return this._Level; }
    public get Name():string { return this._Name; }
    public get Class():ClassType { return this._Class; }
    public constructor(Old?:Character)
    {
        if(Old)
        {
            this._Name = Old._Name;
            this._Class = Old._Class;
        }
        else
        {
            this._Name = "";
            this._Class = ClassType.Warrior;
        }
    }
    public Copy() : Character
    {
        return new Character(this);
    }
    public get Stats():Stats
    {
        return CharacterClassPool.Current.Classes[<string>this._Class].Stats(this._Level);
    }
    public get ArtIndex():number
    {
        return CharacterClassPool.Current.Classes[<string>this._Class].ArtIndex;
    }
    public Deserialize(Data:any) : boolean
    {
        if(Data.Level && Data.Name && Data.Class)
        {
            this._Level = Data.Level;
            this._Name = Data.Name;
            this._Class = <ClassType>Data.Class;
            return true;
        }
        else
        {
            TBX.Log.Error("Character Deserialize Failed!", Data, "Narbu_Data");
            return false;
        }
    }
}