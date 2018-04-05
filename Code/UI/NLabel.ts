export { NLabel }

import * as TBX from "engineer-js";

import { Config } from "./../Core/Config";

class NLabel extends TBX.Label
{
    public constructor(Old?:NLabel, Text?:string)
    {
        super(Old, Text);
        if(Old)
        {

        }
        else
        {
            this.Init();
        }
    }
    protected Init() : void
    {
        this.ForeColor = TBX.Color.FromString(Config.DefaultForeColor);
        this.BackColor = TBX.Color.Empty;
        this.Border.Width = 0;
        this.TextSize = 30;
    }
}