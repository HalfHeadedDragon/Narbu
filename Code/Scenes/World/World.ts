export { World };

import * as TBX from "engineer-js";

import { Config } from "./../../Core/Config";
import { NLabel } from "./../../UI/NLabel";
import { Bucket } from "./Bucket";
import { QuestMarker } from "./QuestMarker";
import { Stop } from "./../../Data/Stop";
import { Campaign } from "./../../Data/Campaign";
import { QuestDetailsPanel } from "./QuestDetailsPanel";

class World extends TBX.Scene2D
{
    private _GO:Campaign;
    private _Back:TBX.Tile;
    private _Bucket:Bucket;
    private _Location:NLabel;
    private _Markers:QuestMarker[];
    private _LastHover:QuestMarker;
    private _QuestDetails:QuestDetailsPanel;
    public get Back():TBX.Tile { return this._Back; }
    public get Location():NLabel { return this._Location; }
    public constructor()
    {
        super();
        this.Init();
    }
    public Init() : void
    {
        this.Name = "World";
        this._Bucket = new Bucket(this);
        this._Markers = [];
        this.InitWell();
        this.InitUI();
        this.Events.MouseMove.push(this.MouseMove.bind(this));
    }
    public DestroyMarkers() : void
    {
        this._QuestDetails.Active = false;
        this._QuestDetails.Update();
        for(let i in this._Markers)
        {
            this.Remove(this._Markers[i]);
        }
        this._Markers = [];
    }
    public RefreshMarkers() : void
    {
        Campaign.Current.Status.Color = this.Back.Paint.Copy();
        if(!this._GO)
        {
            this._GO = <Campaign>TBX.Runner.Current.Game.Data["GO"];
        }
        let Stop:Stop = this._GO.Stops[this._GO.Status.Stop];
        for(let i = 0; i < Stop.LeftMarkers.length; i++)
        {
            let Marker:QuestMarker = new QuestMarker(null, Stop.LeftMarkers[i], this._Bucket.Offset, -(i+1));
            Marker.SetColor(this.Back.Paint);
            this._Markers.push(Marker);
            this.Attach(Marker);
        }
        for(let i = 0; i < Stop.RightMarkers.length; i++)
        {
            let Marker:QuestMarker = new QuestMarker(null, Stop.RightMarkers[i], this._Bucket.Offset, (i+1));
            Marker.SetColor(this.Back.Paint);
            this._Markers.push(Marker);
            this.Attach(Marker);
        }
    }
    private InitWell()
    {
        let Back:TBX.Tile = new TBX.Tile();
        Back.Size = new TBX.Vertex(1920,1080,1);
        Back.Position = new TBX.Vertex(960,540,0);
        Back.Paint = TBX.Color.FromString(Config.DefaultForeColor);
        Back.Fixed = true;
        this._Back = Back;
        this.Attach(Back);
        let WellArt:TBX.ImageCollection = new TBX.ImageCollection(null, ["/Resources/Textures/World/Well.png", "/Resources/Textures/World/Depth.png"]);
        let Well:TBX.Tile = new TBX.Tile();
        Well.Collection = WellArt;
        Well.Index = 0;
        Well.Paint = TBX.Color.FromString(Config.DefaultBackColor);
        Well.Position = new TBX.Vertex(960,960,0.1);
        Well.Size = new TBX.Vertex(1920,1920,1);
        this.Attach(Well);
        let Depth:TBX.Tile = Well.Copy();
        Depth.Index = 1;
        Depth.Position = new TBX.Vertex(960,2880,0.1);
        this.Attach(Depth);
    }
    private InitUI() : void
    {
        this._Location = new NLabel(null, "Start");
        this._Location.Position = new TBX.Vertex(350,160);
        this._Location.Size = new TBX.Vertex(600,200,1);
        this._Location.TextSize = 35;
        this._Location.TextAlign = TBX.TextAlign.Left;
        this._Location.ForeColor = TBX.Color.FromString(Config.DefaultForeColor);
        this.Attach(this._Location);
        this._QuestDetails = new QuestDetailsPanel(null);
        this.Attach(this._QuestDetails);
    }
    private MouseMove(G:TBX.Game, Args:any) : void
    {
        let Picked:QuestMarker = <QuestMarker>TBX.Runner.Current.PickSceneObject(Args.Location);
        if(Picked)
        {
            if(this._LastHover == Picked) return;
            if(this._LastHover != null) this._LastHover.SetColor(this.Back.Paint);
            this._LastHover = Picked;
            let NewForeColor = this.Back.Paint.Copy().Lighten().Lighten().Lighten();
            Picked.SetColor(NewForeColor);
            this._QuestDetails.Position = new TBX.Vertex(Picked.Data["XPos"], Config.QuestMarkerTooltipOffset);
            this._QuestDetails.InitData(Picked.Data["Marker"].QuestID);
            this._QuestDetails.SetColor(NewForeColor);
            this._QuestDetails.Active = true;
        }
        else
        {
            if(this._LastHover == null) return;
            this._LastHover.SetColor(this.Back.Paint);
            this._LastHover = null;
            this._QuestDetails.Active = false;
        }
    }
}