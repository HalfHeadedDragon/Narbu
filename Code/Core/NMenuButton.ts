export { NMenuButton };

import * as TBX from "engineer-js";

import { NButton } from "./NButton";

class NMenuButton extends NButton
{
    public constructor(Old?:NMenuButton, Text?:string, Click?:Function, Position?:number)
    {
        super(Old, Text, Click);
        if(Old)
        {

        }
        else
        {
            if(Position) this.Position = new TBX.Vertex(960, 200 + Position * 150, 0.2);
            this.Init();
        }
    }
    protected Init() : void
    {
        super.Init();
    }
}