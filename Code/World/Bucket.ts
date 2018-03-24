export { Bucket }

import * as TBX from "engineer-js";

import { Config } from "./../Core/Config";
import { World } from "./World";
import { Campaign } from "./../Data/Campaign";

class Bucket
{
    private _GO:Campaign;
    private _World:World;
    private _OnMove:boolean;
    private _Offset:number;
    private _OldOffset:number;
    private _NewOffset:number;
    private _NewIndex:number;
    private _OldForeColor:TBX.Color;
    private _NewForeColor:TBX.Color;
    private _OldBackColor:TBX.Color;
    private _NewBackColor:TBX.Color;
    private _Rope:TBX.Tile;
    public get Offset():number { return this._Offset; }
    public constructor(World:World)
    {
        this._World = World;
        this.Init();
    }
    private Init() : void
    {
        this._OnMove = false;
        this._Offset = 0;
        this._World.Events.KeyDown.push(this.KeyDown.bind(this));
        this._World.Events.Update.push(this.Update.bind(this));
        this._World.Events.Switch.push(this.Switch.bind(this));
        this.InitArt();
    }
    private Switch() : void
    {
        this._GO = <Campaign>TBX.Runner.Current.Game.Data["GO"];
    }
    private KeyDown(G:TBX.Game, Args:any) : void
    {
        if(this._OnMove) return;
        if(Args.KeyCode == 87 || Args.KeyCode == 38)
        {
            if(this._GO.Status.Stop != 0)
            {
                this._NewIndex = this._GO.Status.Stop - 1;
                this._NewOffset = this._GO.Stops[this._NewIndex].Location;
                this._OnMove = true;
                this._OldOffset = this._Offset;
                this._World.Location.Text = "";
                this._World.Location.Update();
                this._OldBackColor = this._GO.Stops[this._GO.Status.Stop].BackColor;
                this._OldForeColor = this._GO.Stops[this._GO.Status.Stop].ForeColor
                this._NewBackColor = this._GO.Stops[this._NewIndex].BackColor;
                this._NewForeColor = this._GO.Stops[this._NewIndex].ForeColor;
            }
        }
        else if(Args.KeyCode == 83 || Args.KeyCode == 40)
        {
            if(this._GO.Status.Stop + 1 < this._GO.Stops.length)
            {
                this._NewIndex = this._GO.Status.Stop + 1;
                this._NewOffset = this._GO.Stops[this._NewIndex].Location;
                this._OnMove = true;
                this._OldOffset = this._Offset;
                this._World.Location.Text = "";
                this._World.Location.Update();
                this._OldBackColor = this._GO.Stops[this._GO.Status.Stop].BackColor;
                this._OldForeColor = this._GO.Stops[this._GO.Status.Stop].ForeColor
                this._NewBackColor = this._GO.Stops[this._NewIndex].BackColor;
                this._NewForeColor = this._GO.Stops[this._NewIndex].ForeColor;
            }
        }
    }
    private Update() : void
    {
        if(!this._OnMove) return;
        if(this._Offset == this._NewOffset)
        {
            this._GO.Status.Stop = this._NewIndex;
            this._OnMove = false;
            this._World.Location.Text = this._GO.Stops[this._NewIndex].Name;
            this._World.Location.Update();
            this._World.RefreshMarkers();
        }
        else
        {
            if(this._Offset < this._NewOffset) this._Offset+=2;
            if(this._Offset > this._NewOffset) this._Offset-=2;
        }
        let Progress:number = this.CalcMoveProgress();
        this.BlendColors(Progress);
        this.MoveRope();
        this._World.Trans.Translation.Y = -this._Offset;
    }
    private CalcMoveProgress() : number
    {
        if(this._NewOffset > this._OldOffset)
        {
            let OffsetDiff:number = this._NewOffset - this._OldOffset;
            let CurrentProgress:number = this._Offset - this._OldOffset;
            return CurrentProgress / OffsetDiff;
        }
        else if(this._NewOffset < this._OldOffset)
        {
            let OffsetDiff:number = this._NewOffset - this._OldOffset;
            let CurrentProgress:number = this._Offset - this._OldOffset;
            return CurrentProgress / OffsetDiff;
        }
    }
    private MoveRope() : void
    {
        this._Rope.Position = new TBX.Vertex(Config.ScreenSize.X / 2, Config.ScreenSize.Y / 2 - Config.RopeOffset + this._Offset / 2, 0.4);
        this._Rope.Size = new TBX.Vertex(Config.RopeWidth,Config.RopeInitialLength  + this._Offset,1)
    }
    private BlendColors(Ratio:number) : void
    {   
        let BackColor:TBX.Color = TBX.Color.Blend(this._OldBackColor, this._NewBackColor, Ratio);
        this._World.Back.Paint = BackColor;
        this._World.Back.Modified = true;
        this._World.Location.ForeColor = BackColor;
    }
    private InitArt() : void
    {
        let BucketArt:TBX.ImageCollection = new TBX.ImageCollection(null, ["/Resources/Textures/StartScene/Bucket.png"]);
        let Bucket:TBX.Tile = new TBX.Tile();
        Bucket.Collection = BucketArt;
        Bucket.Index = 0;
        Bucket.Size = new TBX.Vertex(Config.BucketSize,Config.BucketSize,1);
        Bucket.Position = new TBX.Vertex(Config.ScreenSize.X / 2,Config.ScreenSize.Y / 2,0.4);
        Bucket.Paint = TBX.Color.FromString(Config.DefaultBackColor);
        Bucket.Fixed = true;
        this._World.Attach(Bucket);
        this._Rope = TBX.SceneObjectUtil.CreateTile("Rope", null, new TBX.Vertex(Config.ScreenSize.X / 2,Config.ScreenSize.Y / 2 - Config.RopeOffset,0.4),
            new TBX.Vertex(Config.RopeWidth,Config.RopeInitialLength,1));
        this._Rope.Paint = TBX.Color.FromString(Config.DefaultBackColor);
        this._World.Attach(this._Rope);
    }
}