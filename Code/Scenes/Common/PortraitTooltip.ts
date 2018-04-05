export { PortraitTooltip }

import * as TBX from "engineer-js";

import { Character } from "./../../Data/Character";

import { NLabel } from "./../../UI/NLabel";
import { Campaign } from "./../../Data/Campaign";

class PortraitTooltip extends TBX.Panel
{
    private _Name:NLabel;
    private _ClassLevel:NLabel;
    private _Character:Character;
    public constructor(Old?:PortraitTooltip)
    {
        super(Old);
        if(Old)
        {
            this._Character = Old._Character.Copy();
        }
        else
        {
            this.Init();
        }
    }
    public Copy() : PortraitTooltip
    {
        return new PortraitTooltip(this);
    }
    private Init() : void
    {
        this.Size = new TBX.Vertex(200,60);
        this.BackColor = TBX.Color.Empty;
        this.Border.Radius = 10;
        this.Border.Width = 3;
        this._Name = new NLabel(null, "Title");
        this._Name.Size = new TBX.Vertex(200,30);
        this._Name.Position = new TBX.Vertex(0, -10);
        this._Name.TextSize = 20;
        this.Attach(this._Name);
        this._ClassLevel = new NLabel(null, "Description");
        this._ClassLevel.Size = new TBX.Vertex(170,30);
        this._ClassLevel.Position = new TBX.Vertex(0, 10);
        this._ClassLevel.TextSize = 15;
        this.Attach(this._ClassLevel);
        this.Active = false;
    }
    public UpdateModel(Character:Character) : void
    {
        this._Character = Character;
        if(!this._Character)
        {
            TBX.Log.Error("Portrait Tooltip Failed.", this._Character, "Narbu_UI");
            return;
        }
        this._Name.Text = this._Character.Name;
        this._ClassLevel.Text = <string>this._Character.Class + " Lvl " + this._Character.Level;
    }
    public SetColor(Paint:TBX.Color) : void
    {
        this.Border.Color = Paint;
        this._Name.ForeColor = Paint;
        this._ClassLevel.ForeColor = Paint;
    }
}