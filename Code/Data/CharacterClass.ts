export { ClassType, CharacterClass, CharacterClassPool }

import * as TBX from "engineer-js";

import { Stats } from "./Stats";
import { DefaultClasses } from "./Default/Classes";

enum ClassType
{
    Warrior = "Warrior",
    Archer = "Archer"
}

class CharacterClass
{
    private _Name:string;
    private _ArtIndex:number;
    private _Base:Stats;
    private _Gain:Stats;
    public get Name():string { return this._Name; }
    public get ArtIndex():number { return this._ArtIndex; }
    public constructor(Old?:CharacterClass)
    {
        if(Old)
        {
            this._Name = Old._Name;
            this._ArtIndex = Old._ArtIndex;
            this._Base = Old._Base.Copy();
            this._Gain = Old._Gain.Copy();
        }
        else
        {
            this._Name = "";
            this._ArtIndex = 0;
            this._Base = new Stats();
            this._Gain = new Stats();
        }
    }
    public Copy() : CharacterClass
    {
        return new CharacterClass(this);
    }
    public Stats(Level:number) : Stats
    {
        return this._Base.Copy().Add(this._Gain.Copy().Multiply(Level));
    }
    public Deserialize(Data:any) : boolean
    {
        if(Data.Base && Data.Gain)
        {
            this._Name = Data.Name;
            this._ArtIndex = Data.ArtIndex;
            if(!this._Base.Deserialize(Data.Base)) return false;
            if(!this._Gain.Deserialize(Data.Gain)) return false;
            return true;
        }
        else
        {
            TBX.Log.Error("CharacterClass Deserialize Failed!", Data, "Narbu_Data");
            return false;
        }
    }
}

class CharacterClassPool
{
    public static Current:CharacterClassPool;
    private _Classes:any;
    public get Classes():any { return this._Classes; }
    public constructor(Old?:CharacterClassPool)
    {
        if(Old)
        {
            this._Classes = Old._Classes;
        }
        else
        {
            this._Classes = {};
            this.Init();
        }
    }
    public Copy() : CharacterClassPool
    {
        return new CharacterClassPool(this);
    }
    private Init()
    {
        this.Deserialize(DefaultClasses);
        CharacterClassPool.Current = this;
    }
    public Deserialize(Data:any[]) : void
    {
        for(let i in Data)
        {
            let Class:CharacterClass = new CharacterClass();
            if(!Class.Deserialize(Data[i])) continue;
            this._Classes[Class.Name] = Class;
        }
    }
}