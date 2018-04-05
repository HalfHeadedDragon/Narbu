export { Slots };

import * as TBX from "engineer-js";

import { Config } from "./../../Core/Config";
import { NLabel } from "./../../UI/NLabel";
import { NSelectable } from "./../../UI/NSelectable";
import { Campaign } from "./../../Data/Campaign";
import { DefaultCampaign } from "./../../Data/DefaultCampaign";

import { Brief } from "./../Brief/Brief";

class Slots extends TBX.Scene2D
{
    public constructor()
    {
        super();
        this.Init();
    }
    public Init() : void
    {
        this.Name = "Slots";
        this.InitBack();
        this.InitMenu();
    }
    private InitMenu() : void
    {
        let Title:NLabel = new NLabel(null, "Slots");
        Title.Position = new TBX.Vertex(230,200,0.2);
        Title.Size = new TBX.Vertex(400,200,1);
        Title.TextSize = 90;
        this.Attach(Title);
        this.CreateEntry(" New Game", this.NewGame.bind(this), 0);
        this.CreateEntry(" New Game", null, 1);
        this.CreateEntry(" New Game", null, 2);
        this.CreateEntry(" New Game", null, 3);
        this.CreateEntry(" New Game", null, 4);
        this.CreateEntry(" New Game", null, 5);
    }
    private CreateEntry(Title:string, Event:Function, Position:number) : void
    {
        let NewEntry:NSelectable = new NSelectable(null, Title);
        NewEntry.Position = new TBX.Vertex(600,350 + Position * 110,0.2);
        NewEntry.Size = new TBX.Vertex(900,100,1);
        NewEntry.TextSize = 60;
        NewEntry.TextAlign = TBX.TextAlign.Left;
        NewEntry.Padding = 10;
        NewEntry.Events.Click.push(Event);
        this.Attach(NewEntry);
    }
    private InitBack() : void
    {
        let Back:TBX.Tile = new TBX.Tile();
        Back.Size = new TBX.Vertex(1920,1080,1);
        Back.Position = new TBX.Vertex(960,540,0);
        Back.Paint = TBX.Color.FromString(Config.DefaultBackColor);
        Back.Fixed = true;
        this.Attach(Back);
    }
    public NewGame(G:any, Args:any) : void
    {
        let NewCampaign:Campaign = new Campaign();
        NewCampaign.Deserialize(DefaultCampaign);
        TBX.Runner.Current.Game.Attach(new Brief());
        TBX.Runner.Current.Game.Data["GO"] = NewCampaign;
        TBX.Runner.Current.SwitchScene("World", false);
    }
}