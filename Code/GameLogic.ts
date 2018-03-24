export { GameLogic };

import * as TBX from "engineer-js";

import { Menu } from "./Menu/Menu";
import { World } from "./World/World";
import { Slots } from "./Slots/Slots";

class GameLogic
{
    private _Game:any;
    private _Runner:any;
    public constructor()
    {
        this._Game = new TBX.Game();
        this._Game.Name = "Narbu";
        this._Runner = new TBX.Runner(this._Game, TBX.DrawEngineType.ThreeJS);
        this._Runner.SetResolution(new TBX.Vertex(1920, 1080, 0));
        this._Game.Attach(new Menu());
        this._Game.Attach(new Slots());
        this._Game.Attach(new World());
    }
    public Run() : void
    {
        this._Runner.SwitchScene("Menu");
        this._Runner.Run();
    }
}