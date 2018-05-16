export { Menu };

import * as TBX from "engineer-js";

import { Config } from "./../../Core/Config";
import { NLabel } from "./../../UI/NLabel";
import { NMenuButton } from "./../../UI/NMenuButton";

class Menu extends TBX.Scene2D
{
    public constructor()
    {
        super();
        this.Init();
    }
    public Init() : void
    {
        this.Name = "Menu";
        this.InitBack();
        this.InitMenu();
    }
    private InitMenu() : void
    {
        let Title:NLabel = new NLabel(null, "Narbu");
        Title.Position = new TBX.Vertex(960,200,0.2);
        Title.Size = new TBX.Vertex(600,200,1);
        Title.TextSize = 120;
        this.Attach(Title);
        this.Attach(new NMenuButton(null, "Continue", null, 1));
        this.Attach(new NMenuButton(null, "Game", this.GameClick.bind(this), 2));
        this.Attach(new NMenuButton(null, "Settings", null, 3));
        //this.Attach(new NMenuButton(null, "Credits", null, 4));
        this.Attach(new NMenuButton(null, "Preview", this.PreviewClick.bind(this), 4));
    }
    private InitBack() : void
    {
        let Back:TBX.Tile = new TBX.Tile();
        Back.Size = new TBX.Vertex(1920,1080,1);
        Back.Position = new TBX.Vertex(960,540,0);
        Back.Paint = TBX.Color.FromString(Config.DefaultBackColor);
        Back.Fixed = true;
        this.Attach(Back);
    }
    public GameClick(G:any, Args:any) : void
    {
        TBX.Runner.Current.SwitchScene("Slots", false);
    }
    public SettingsClick(G:any, Args:any) : void
    {
        TBX.Runner.Current.SwitchScene("Settings", false);
    }
    public CreditsClick(G:any, Args:any) : void
    {
        TBX.Runner.Current.SwitchScene("Credits", false);
    }
    public PreviewClick(G:any, Args:any) : void
    {
        TBX.Runner.Current.SwitchScene("Preview", false);
    }
}