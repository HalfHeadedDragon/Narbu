export { MainMenu };

import * as TBX from "engineer-js";

import { GameScene } from "./GameScene";

class MainMenu extends TBX.Scene2D
{
    private _Game:any;
    private _Runner:any;
    public constructor(Runner:any, Game:any)
    {
        super();
        this._Game = Game;
        this._Runner = Runner;
        this.Init();
    }
    public Init() : void
    {
        this.Name = "Menu";
        let Buttons:any = new TBX.ImageCollection(null, ["/Resources/Textures/Play.png"]);
        let Play:any = new TBX.Tile();
        Play.Name = "Play";
        Play.Collection = Buttons;
        Play.Index = 0;
        Play.Trans.Scale = new TBX.Vertex(300, 150, 1);
        Play.Trans.Translation = new TBX.Vertex(200, 200, 0);
        Play.Events.MouseDown.push(this.PlayClick.bind(this));
        this.AddSceneObject(Play);
        this._Game.AddScene(this);
    }
    public PlayClick(G:any, Args:any) : void
    {
        let Scene = new GameScene();
        this._Game.AddScene(Scene);
        this._Runner.SwitchScene("Game", false);
    }
}