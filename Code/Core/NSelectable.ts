export { NSelectable };

import * as TBX from "engineer-js";

import { Config } from "./Config";

class NSelectable extends TBX.Button
{
    public constructor(Old?:NSelectable, Text?:string, Click?:Function)
    {
        super(Old, Text);
        if(Old)
        {

        }
        else
        {
            if(Click) this.Events.Click.push(Click);
            this.Init();
        }
    }
    protected Init() : void
    {
        this.Events.MouseEnter.push(this.OnMouseEnter.bind(this));
        this.Events.MouseLeave.push(this.OnMouseLeave.bind(this));
        this.BackColor = TBX.Color.Empty;
        this.ForeColor = TBX.Color.FromString(Config.DefaultForeColor);
        this.Border.Width = 0;
        this.Border.Color = TBX.Color.FromString(Config.DefaultForeColor);
        this.Border.Radius = 15;
        this.TextSize = 50;
        this.Padding = 10;
        this.Size = new TBX.Vertex(250,80,1);
    }
    private OnMouseEnter(Event) : void
    {
        this.Border.Width = 3;
        this.ForeColor = TBX.Color.FromString(Config.DefaultForeColor);
        this.Update();
    }
    private OnMouseLeave(Event) : void
    {
        this.Border.Width = 0;
        this.ForeColor = TBX.Color.FromString(Config.DefaultForeColor);
        this.Update();
    }
}