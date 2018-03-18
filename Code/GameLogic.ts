export { GameLogic };

import * as TBX from "engineer-js";

import { MainMenu } from "./MainMenu";
import { GameScene } from "./GameScene";

class GameLogic
{
    private _Game:any;
    private _Runner:any;
    public constructor()
    {
        this._Game = new TBX.Game();
        this._Game.Name = "Narbu";
        this._Runner = new TBX.Runner(this._Game, TBX.DrawEngineType.ThreeJS);
        this._Runner.SetResolution(new TBX.Vertex(1920, 1080, 0), true);
        let _Menu:any = new MainMenu(this._Runner, this._Game);
        this._Game.AddScene(_Menu);
    }
    public Run() : void
    {
        this._Runner.SwitchScene("Menu");
        this._Runner.Run();
    }
}