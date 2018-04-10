export { RosterPanel }

import * as TBX from "engineer-js";

import { Roster } from "./../../Data/Roster";

import { Portrait } from "./Portrait";

class RosterPanel extends TBX.Tile
{
    private _Scene:TBX.Scene2D;
    private _Color:TBX.Color;
    private _Roster:Roster;
    private _Visited:Portrait;
    private _Portraits:Portrait[];
    public constructor(Old?:RosterPanel, Roster?:Roster)
    {
        super(Old);
        this._Portraits = [];
        if(Old)
        {
            this._Roster = Old._Roster.Copy();
        }
        else
        {
            this.Init();
            if(Roster)
            {
                this._Roster = Roster;
            }
        }
    }
    public Copy() : RosterPanel
    {
        return new RosterPanel(this);
    }
    private Init() : void
    {
        this.Paint = TBX.Color.Empty;
        this.Size = new TBX.Vertex(1200, 200);
    }
    public UpdateModel(Roster:Roster) : void
    {
        this._Roster = Roster;
        if(!this._Scene) return;
        for(let i in this._Portraits)
        {
            this._Scene.Remove(this._Portraits[i]);
        }
        this._Portraits = [];
        for(let i = 0; i < this._Roster.Characters.length; i++)
        {
            let CurrentPortrait:Portrait = new Portrait(null, this._Roster.Characters[i]);
            CurrentPortrait.Position = new TBX.Vertex(this.Position.X + i * 200 - 550, this.Position.Y, this.Position.Z + 0.1);
            CurrentPortrait.SetColor(this._Color);
            this._Portraits.push(CurrentPortrait);
            this._Scene.Attach(CurrentPortrait);
        }
    }
    public SetColor(Color:TBX.Color) : void
    {
        this._Color = Color;
    }
    public OnAttach(Args:any) : void
    {
        this._Scene = Args.Scene;
        this._Scene.Events.MouseMove.push(this.MouseMove.bind(this));
        if(this._Roster) this.UpdateModel(this._Roster);
    }
    private MouseMove(G:TBX.Game, Args:any) : void
    {
        let Picked:TBX.SceneObject = TBX.Runner.Current.PickSceneObject(Args.Location);
        if(Picked && Picked.Data["Portrait"])
        {
            if(this._Visited == Picked) return;
            if(this._Visited) this._Visited.MouseLeave();
            this._Visited = <Portrait>Picked;
            this._Visited.MouseEnter();
        }
        else
        {
            if(this._Visited) this._Visited.MouseLeave();
            this._Visited = null;
        }
    }
}