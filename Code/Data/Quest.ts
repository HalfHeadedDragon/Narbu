export { Quest }

import * as TBX from "engineer-js";

enum QuestType
{
    Rope = "Rope",
    Tresure = "Treasure",
    Forge = "Forge",
    Altar = "Altar"
}

enum QuestSetting
{
    Ruins = "Ruins",
    Caves = "Caves",
    Dungeon = "Dungeon",
    Necropolis = "Necropolis",
    Hellopolis = "Hellopolis",
    Beastopolis = "Beastopolis"
}

class Quest
{
    private _ID:string;
    private _Length:number;
    private _Width:number;
    private _Name:string;
    private _Description:string;
    private _Type:string;
    private _Setting:QuestSetting;
    public get ID():string { return this._ID; }
    public get Length():number { return this._Length; }
    public get Width():number { return this._Width; }
    public get Name():string { return this._Name; }
    public get Description():string { return this._Description; }
    public get Type():string { return this._Type; }
    public get Setting():QuestSetting { return this._Setting; }
    public constructor(Old?:Quest)
    {
        if(Old)
        {
            this._ID = Old._ID;
            this._Length = Old._Length;
            this._Width = Old._Width;
            this._Name = Old._Name;
            this._Description = Old._Description;
            this._Type = Old._Type;
            this._Setting = Old._Setting;
        }
        else
        {
            this._ID = "Empty";
            this._Length = 1;
            this._Width = 5;
            this._Name = "";
            this._Description = "";
            this._Type = QuestType.Tresure;
            this._Setting = QuestSetting.Ruins;
        }
    }
    public Copy() : Quest
    {
        return new Quest(this);
    }
    public Deserialize(Data:any) : boolean
    {
        if(Data.Type && Data.ID && Data.ID != "Empty" && Data.Name && Data.Length && Data.Setting)
        {
            this._ID = Data.ID;
            this._Length = Data.Length;
            this._Width = Data.Width;
            this._Name = Data.Name;
            this._Description = Data.Description;
            this._Type = <QuestType> Data.Type;
            this._Setting = <QuestSetting> Data.Setting;
            return true;
        }
        else
        {
            TBX.Log.Error("Quest Deserialize Failed!", Data, "Narbu_Data");
            return false;
        }
    }
}