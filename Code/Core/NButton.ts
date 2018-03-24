export { NButton };

import * as TBX from "engineer-js";

import { Config } from "./Config";

class NButton extends TBX.Button
{
    public constructor(Old?:NButton, Text?:string, Click?:Function)
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
        this.BackColor = TBX.Color.FromString(Config.DefaultForeColor);
        this.ForeColor = TBX.Color.FromString(Config.DefaultBackColor);
        this.Border.Width = 0;
        this.Border.Radius = 5;
        this.TextSize = 50;
        this.Padding = 10;
        this.Size = new TBX.Vertex(250,80,1);
    }
}