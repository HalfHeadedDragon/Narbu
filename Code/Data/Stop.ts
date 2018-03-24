export { Stop }

import * as TBX from "engineer-js";

import { Marker } from "./Marker";

class Stop
{
    private _Name:string;
    private _Depth:number;
    private _ForeColor:TBX.Color;
    private _BackColor:TBX.Color;
    private _LeftMarkers:Marker[];
    private _RightMarkers:Marker[];
    public get Name():string { return this._Name; }
    public get Location():number { return this._Depth; }
    public get ForeColor():TBX.Color { return this._ForeColor; }
    public get BackColor():TBX.Color { return this._BackColor; }
    public get LeftMarkers():Marker[] { return this._LeftMarkers; }
    public get RightMarkers():Marker[] { return this._RightMarkers; }
    public constructor(Old?:Stop)
    {
        if(Old)
        {
            this._Name = Old._Name;
            this._Depth = Old._Depth;
            this._ForeColor = Old._ForeColor.Copy();
            this._BackColor = Old._BackColor.Copy();
            this._LeftMarkers = [];
            for(let i in Old._LeftMarkers)
            {
                this._LeftMarkers.push(Old._LeftMarkers[i].Copy());
            }
            this._RightMarkers = [];
            for(let i in Old._RightMarkers)
            {
                this._RightMarkers.push(Old._RightMarkers[i].Copy());
            }
        }
        else
        {
            this._Name = "";
            this._Depth = 0;
            this._ForeColor = TBX.Color.Black;
            this._BackColor = TBX.Color.White;
            this._LeftMarkers = [];
            this._RightMarkers = [];
        }
    }
    public Copy() : Stop
    {
        return new Stop(this);
    }
    public Deserialize(Data:any) : void
    {
        if(Data.Name && Data.ForeColor && Data.BackColor)
        {
            this._Name = Data.Name;
            this._Depth = Data.Depth;
            this._ForeColor = TBX.Color.FromString(Data.ForeColor);
            this._BackColor = TBX.Color.FromString(Data.BackColor);
            if(Data.LeftMarkers) for(let i in Data.LeftMarkers)
            {
                let LoadedMarker:Marker = new Marker();
                LoadedMarker.Deserialize(Data.LeftMarkers[i]);
                this._LeftMarkers.push(LoadedMarker);
            }
            if(Data.RightMarkers) for(let i in Data.RightMarkers)
            {
                let LoadedMarker:Marker = new Marker();
                LoadedMarker.Deserialize(Data.RightMarkers[i]);
                this._RightMarkers.push(LoadedMarker);
            }
        }
        else TBX.Log.Error("Stop Deserialize Failed!", Data, "Narbu_Data");
    }
}