export { Brief }

import * as TBX from "engineer-js";

import { Campaign } from "./../../Data/Campaign";

import { Squad } from "./../Common/Squad";
import { RosterPanel } from "./../Common/RosterPanel";
import { QuestInfo } from "./../Common/QuestInfo";
import { Character } from "./../Common/Character";

class Brief extends TBX.Scene2D
{
    private _Campaign:Campaign;
    private _Roster:RosterPanel;
    public constructor(Old?:Brief)
    {
        super(Old);
        this._Campaign = Campaign.Current;
        if(Old)
        {
            this._Roster = Old._Roster.Copy();
        }
        else
        {
            this.Name = "Brief";
            this.Init();
        }
    }
    public Copy() : Brief
    {
        return new Brief(this);
    }
    private Init()
    {
        this.BackColor = this._Campaign.Status.Color;
        this._Roster = new RosterPanel(null, this._Campaign.Roster);
        this._Roster.Position = new TBX.Vertex(1280, 740, 0.5);
        this._Roster.SetColor(TBX.Color.Black);
        this.Attach(this._Roster);
    }
}