export { World };

import * as TBX from "engineer-js";

import { Config } from "./../Core/Config";
import { NLabel } from "./../Core/NLabel";
import { Bucket } from "./Bucket";
import { QuestMarker } from "./QuestMarker";
import { Stop } from "./../Data/Stop";
import { Campaign } from "./../Data/Campaign";

class World extends TBX.Scene2D
{
    private _GO:Campaign;
    private _Back:TBX.Tile;
    private _Bucket:Bucket;
    private _Location:NLabel;
    private _Markers:QuestMarker[];
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
    }
    public DestroyMarkers() : void
    {
        for(let i in this._Markers)
        {
            this.Remove(this._Markers[i]);
        }
        this._Markers = [];
    }
    public RefreshMarkers() : void
    {
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
        let WellArt:TBX.ImageCollection = new TBX.ImageCollection(null, ["/Resources/Textures/StartScene/Well.png", "/Resources/Textures/StartScene/Depth.png"]);
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
        let Location:NLabel = new NLabel(null, "Start");
        Location.Position = new TBX.Vertex(200,150,0.2);
        Location.Size = new TBX.Vertex(300,200,1);
        Location.TextSize = 50;
        Location.TextAlign = TBX.TextAlign.Left;
        Location.ForeColor = TBX.Color.FromString(Config.DefaultForeColor);
        this._Location = Location;
        this.Attach(Location);
    }
}