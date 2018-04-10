export { Portrait }

import * as TBX from "engineer-js";

import { Character } from "./../../Data/Character";

import { PortraitTooltip } from "./PortraitTooltip";

class Portrait extends TBX.Tile
{
    private static Collection:TBX.ImageCollection;
    private _Character:Character;
    private _Tooltip:PortraitTooltip;
    public constructor(Old?:Portrait, Character?:Character)
    {
        super(Old);
        if(Old)
        {
            this._Character = Old._Character;
        }
        else
        {
            this.Init();
            if(Character)
            {
                this._Character = Character;
                this.UpdateModel();
            }
        }
    }
    public Copy() : Portrait
    {
        return new Portrait(this);
    }
    private Init() : void
    {
        if(!Portrait.Collection)
        {
            Portrait.Collection = new TBX.ImageCollection(null, []);
            for(let i = 0; i < 2; i++) Portrait.Collection.Images.push("/Resources/Textures/Common/Classes/Portrait"+i+".png");
        }
        this.Data["Pickable"] = true;
        this.Data["Portrait"] = true;
        this.Size = new TBX.Vertex(180,180,1);
        this.Collection = Portrait.Collection;
        this._Tooltip = new PortraitTooltip();
        if(this._Character) this.UpdateModel();
    }
    public SetColor(Color:TBX.Color) : void
    {
        this.Paint = Color.Copy();
        this.Data["BaseColor"] = Color.Copy();
        this._Tooltip.SetColor(Color.Copy().Lighten().Lighten().Lighten());
    }
    public UpdateModel() : void
    {
        if(!this._Character) return;
        this.Index = 1;//this._Character.ArtIndex;
        this._Tooltip.UpdateModel(this._Character);
    }
    public OnAttach(Args:any) : void
    {
        // Override
        Args.Scene.Attach(this._Tooltip);
    }
    public MouseEnter() : void
    {
        this._Tooltip.Position = new TBX.Vertex(this.Position.X, this.Position.Y + 120);
        this._Tooltip.Active = true;
        this.Paint = this.Data["BaseColor"].Copy().Lighten().Lighten().Lighten();
        this.Modified = true;
    }
    public MouseLeave() : void
    {
        this._Tooltip.Active = false;
        this.Paint = this.Data["BaseColor"];
        this.Modified = true;
    }
}