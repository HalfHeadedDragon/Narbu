export { Campaign }

import * as TBX from "engineer-js";

import { Stop } from "./Stop";
import { Quest } from "./Quest";
import { Status } from "./Status";
import { Roster } from "./Roster";

class Campaign
{
    public static Current:Campaign;
    private _Status:Status;
    private _Stops:Stop[];
    private _Quests:Quest[];
    private _Roster:Roster;
    public get Status():Status { return this._Status; }
    public get Stops():Stop[] { return this._Stops; }
    public get Quests():Quest[] { return this._Quests; }
    public get Roster():Roster { return this._Roster; }
    public constructor(Old?:Campaign)
    {
        if(Old)
        {
            this._Status = Old._Status.Copy();
            this._Stops = [];
            for(let i in Old._Stops) this._Stops.push(Old._Stops[i].Copy());
            for(let i in Old._Quests) this._Quests.push(Old._Quests[i].Copy());
            this._Roster = Old._Roster.Copy();
        }
        else
        {
            this._Status = new Status();
            this._Stops = [];
            this._Quests = [];
            this._Roster = new Roster();
        }
        Campaign.Current = this;
    }
    public Copy() : Campaign
    {
        return new Campaign(this);
    }
    public FindQuest(QuestID:string) : Quest
    {
        for(let i in this._Quests)
        {
           if(this._Quests[i].ID == QuestID) return this._Quests[i];
        }
        return null;
    }
    public Deserialize(Data:any) : boolean
    {
        if(Data.Stops && Data.Quests && Data.Roster)
        {
            if(Data.Status) this._Status.Deserialize(Data.Status);
            this._Roster.Deserialize(Data.Roster);
            for(let i in Data.Stops)
            {
                let LoadedStop:Stop = new Stop();
                if(!LoadedStop.Deserialize(Data.Stops[i])) continue;
                this._Stops.push(LoadedStop);
            }
            for(let i in Data.Quests)
            {
                let LoadedQuest:Quest = new Quest();
                if(!LoadedQuest.Deserialize(Data.Quests[i])) continue;
                this._Quests.push(LoadedQuest);
            }
            return true;
        }
        else
        {
            TBX.Log.Error("Campaign Deserialize Failed!", Data, "Narbu_Data");
            return false;
        }
    }
}