export { QuestMarker }

import * as TBX from "engineer-js";

import { Config } from "./../Core/Config";
import { Marker } from "./../Data/Marker";

class QuestMarker extends TBX.Tile
{
    private static _QuestCollection:TBX.ImageCollection;
    private _Icon:TBX.Tile;
    public constructor(Old?:QuestMarker, Data?:any, Offset?:number, Position?:number)
    {
        super(Old);
        if(Old)
        {

        }
        else
        {
            console.log(Data);
            if(Data && Offset && Position)
            {
                console.log("@");
                this.Init(Data, Offset, Position);
            }
        }
    }
    private Init(Current:Marker, Offset:number, Position:number) : void
    {
        if(!QuestMarker._QuestCollection) QuestMarker._QuestCollection = new TBX.ImageCollection(null, ["/Resources/Textures/StartScene/Quests/Empty.png",
        "/Resources/Textures/StartScene/Quests/Rope.png", "/Resources/Textures/StartScene/Quests/Treasure.png"]);
        this.Collection = QuestMarker._QuestCollection;
        this.Index = 0;
        this.Size = new TBX.Vertex(Config.QuestMarkerSize,Config.QuestMarkerSize,1);
        this.Position = new TBX.Vertex(Config.ScreenSize.X / 2 + Position * Config.QuestMarkerOffset, Config.ScreenSize.Y / 2 + Offset, 0.5);
        this._Icon = TBX.SceneObjectUtil.CreateTile("Icon", null, this.Position, this.Size);
        this._Icon.Collection = QuestMarker._QuestCollection;
        if(Current.Type == "Rope") this._Icon.Index = 1;
        else if(Current.Type == "Treasure") this._Icon.Index = 2;
        else if(Current.Type == "Forge") this._Icon.Index = 1;
    }
    public OnAttach(Args:any) : void
    {
        // Override
        Args.Scene.Attach(this._Icon);
    }
    public OnRemove(Args:any) : void
    {
        // Override
        Args.Scene.Remove(this._Icon);
    }
}