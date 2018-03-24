export { Campaign }

import * as TBX from "engineer-js";

import { Stop } from "./Stop";
import { Status } from "./Status";

class Campaign
{
    private _Status:Status;
    private _Stops:Stop[];
    public get Status():Status { return this._Status; }
    public get Stops():Stop[] { return this._Stops; }
    public constructor(Old?:Campaign)
    {
        if(Old)
        {
            this._Status = Old._Status.Copy();
            this._Stops = [];
            for(let i in Old._Stops)
            {
                this._Stops.push(Old._Stops[i].Copy());
            }
        }
        else
        {
            this._Status = new Status();
            this._Stops = [];
        }
    }
    public Copy() : Campaign
    {
        return new Campaign(this);
    }
    public Deserialize(Data:any) : void
    {
        if(Data.Stops)
        {
            for(let i in Data.Stops)
            {
                let LoadedStop:Stop = new Stop();
                LoadedStop.Deserialize(Data.Stops[i]);
                this._Stops.push(LoadedStop);
                if(Data.Status) this._Status.Deserialize(Data.Status);
            }
        }
        else TBX.Log.Error("Campaign Deserialize Failed!", Data, "Narbu_Data");
    }
}