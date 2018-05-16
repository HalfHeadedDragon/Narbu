export { Preview }

import * as TBX from "engineer-js";

class Preview extends TBX.Scene2D
{
    private _WDown:boolean;
    private _ADown:boolean;
    private _SDown:boolean;
    private _DDown:boolean;
    private _RDown:boolean;
    private _FDown:boolean;
    private _TDown:boolean;
    private _GDown:boolean;
    private _Light:TBX.Light;
    private _LightIcon:TBX.Tile;
    public constructor(Old?:Preview)
    {
        super(Old);
        if(Old)
        {
            
        }
        else
        {
            this.Init();
        }
    }
    private Init() : void
    {
        this.Name = "Preview";
        let Back:TBX.Tile = TBX.SceneObjectUtil.CreateTile("Background", ["/Resources/Textures/Preview/Background.png"], new TBX.Vertex(960, 540, 0), new TBX.Vertex(1920, 1080, 1));
        Back.NormalCollection = new TBX.ImageCollection(null, ["/Resources/Textures/Preview/Normal.png"]);
        Back.Material.Type = TBX.MaterialType.Default;
        Back.AmbientColor = TBX.Color.FromString("#888888");
        this.Attach(Back);
        this.InitCharacter("Archer", new TBX.Vertex(200, 520, 0.1), new TBX.Vertex(500, 500, 1));
        this.InitCharacter("Warlock", new TBX.Vertex(500, 500, 0.1), new TBX.Vertex(510, 510, 1));
        this.InitCharacter("Knight", new TBX.Vertex(600, 440, 0.1), new TBX.Vertex(680, 680, 1));
        this.InitCharacter("Berserker", new TBX.Vertex(800, 490, 0.1), new TBX.Vertex(540, 540, 1));
        
        this._LightIcon = TBX.SceneObjectUtil.CreateTile("LightIcon", ["/Resources/Textures/Preview/LightIcon.png"], new TBX.Vertex(960, 200, 0), new TBX.Vertex(100, 100, 1));
        this.Attach(this._LightIcon);
        this._Light = new TBX.Light();
        this._Light.Intensity = 100;
        this._Light.Radius = 200;
        this._Light.Position = new TBX.Vertex(960, 200, 0.1);
        this._Light.Attenuation = new TBX.LightAttenuation(null, 0.3, 0.3, 0.3);
        this.Attach(this._Light);
        this.Events.Update.push(this.Update.bind(this));
        this.Events.KeyDown.push(this.KeyDown.bind(this));
        this.Events.KeyUp.push(this.KeyUp.bind(this));
    }
    private InitCharacter(ID:string, Location:TBX.Vertex, Size:TBX.Vertex) : void
    {
        let Character:TBX.Sprite = TBX.SceneObjectUtil.CreateSprite(ID, ["/Resources/Textures/Characters/"+ID+"/"+ID+".png"], Location, Size);
        Character.NormalCollection = new TBX.SpriteSetCollection(null, []);
        Character.NormalCollection.SpriteSets.push(new TBX.SpriteSet(null, ["/Resources/Textures/Characters/"+ID+"/Normal.png"], "Normal"));
        Character.Material.Type = TBX.MaterialType.Toon;
        Character.AmbientColor = TBX.Color.Black;
        this.Attach(Character);
    }
    private Update() : void
    {
        let Offset:number = 5;
        let IntensityOffset:number = 1;
        if(this._WDown)
        {
            this._Light.Position.Y -= Offset;
            this._LightIcon.Position.Y -= Offset;
        }
        else if(this._SDown)
        {
            this._Light.Position.Y += Offset;
            this._LightIcon.Position.Y += Offset;
        }
        if(this._ADown)
        {
            this._Light.Position.X -= Offset;
            this._LightIcon.Position.X -= Offset;
        }
        else if(this._DDown)
        {
            this._Light.Position.X += Offset;
            this._LightIcon.Position.X += Offset;
        }
        if(this._RDown)
        {
            this._Light.Intensity += IntensityOffset;
        }
        else if(this._FDown)
        {
            this._Light.Intensity -= IntensityOffset;
        }
        if(this._TDown)
        {
            this._Light.Radius += IntensityOffset;
        }
        else if(this._GDown)
        {
            this._Light.Radius -= IntensityOffset;
        }
    }
    private KeyDown(G:TBX.Game, Args:any) : void
    {
        if(Args.KeyCode == 87) this._WDown = true;
        if(Args.KeyCode == 65) this._ADown = true;
        if(Args.KeyCode == 83) this._SDown = true;
        if(Args.KeyCode == 68) this._DDown = true;
        if(Args.KeyCode == 82) this._RDown = true;
        if(Args.KeyCode == 70) this._FDown = true;
        if(Args.KeyCode == 84) this._TDown = true;
        if(Args.KeyCode == 71) this._GDown = true;
    }
    private KeyUp(G:TBX.Game, Args:any) : void
    {
        if(Args.KeyCode == 87) this._WDown = false;
        if(Args.KeyCode == 65) this._ADown = false;
        if(Args.KeyCode == 83) this._SDown = false;
        if(Args.KeyCode == 68) this._DDown = false;
        if(Args.KeyCode == 82) this._RDown = false;
        if(Args.KeyCode == 70) this._FDown = false;
        if(Args.KeyCode == 84) this._TDown = false;
        if(Args.KeyCode == 71) this._GDown = false;
    }
}