export { QuestMarker }

import * as TBX from "engineer-js";

import { Config } from "./../../Core/Config";
import { Campaign } from "./../../Data/Campaign";
import { Marker } from "./../../Data/Marker";

class QuestMarker extends TBX.Tile
{
    private static _QuestCollection:TBX.ImageCollection;
    private _MarkerData:Marker;
    private _Icon:TBX.Tile;
    public constructor(Old?:QuestMarker, Data?:any, Offset?:number, Position?:number)
    {
        super(Old);
        if(Old)
        {

        }
        else
        {
            if(Data && Offset && Position)
            {
                this.Init(Data, Offset, Position);
            }
        }
    }
    private Init(Current:Marker, Offset:number, Position:number) : void
    {
        this._MarkerData = Current;
        this.Data["Marker"] = Current;
        this.Data["Pickable"] = true;
        if(!QuestMarker._QuestCollection) QuestMarker._QuestCollection = new TBX.ImageCollection(null, ["/Resources/Textures/World/Quests/Empty.png",
        "/Resources/Textures/World/Quests/Rope.png", "/Resources/Textures/World/Quests/Treasure.png", "/Resources/Textures/World/Quests/Forge.png",
        "/Resources/Textures/World/Quests/Altar.png"]);
        this.Collection = QuestMarker._QuestCollection;
        this.Index = 0;
        this.Size = new TBX.Vertex(Config.QuestMarkerSize,Config.QuestMarkerSize,1);
        let Direction = Position/Math.abs(Position);
        let XPos:number = Config.ScreenSize.X / 2 + Direction * Config.QuestMarkerInitOffset + Position * Config.QuestMarkerOffset;
        this.Data["XPos"] = XPos;
        this.Position = new TBX.Vertex(XPos, Config.ScreenSize.Y / 2 + Offset, 0.5);
        this._Icon = TBX.SceneObjectUtil.CreateTile("Icon", null, new TBX.Vertex(this.Position.X, this.Position.Y, 0.6), new TBX.Vertex(Config.QuestMarkerIconSize,Config.QuestMarkerIconSize,1));
        this._Icon.Collection = QuestMarker._QuestCollection;
        this._Icon.Paint = TBX.Color.FromString("#010101");
        this.Events.Click.push(this.OnClick.bind(this));
        if(Current.Type == "Rope") this._Icon.Index = 1;
        else if(Current.Type == "Treasure") this._Icon.Index = 2;
        else if(Current.Type == "Forge") this._Icon.Index = 3;
        else if(Current.Type == "Altar") this._Icon.Index = 4;
    }
    public SetColor(Color:TBX.Color) : void
    {
        this.Paint = Color;
        this.Modified = true;
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
    private OnClick() : void
    {
        Campaign.Current.Status.QuestID = this._MarkerData.QuestID;
        TBX.Runner.Current.SwitchScene("Brief", false);
    }
}