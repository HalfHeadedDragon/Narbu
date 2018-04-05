export { QuestDetailsPanel }

import * as TBX from "engineer-js";

import { Quest } from "./../../Data/Quest";
import { Marker } from "./../../Data/Marker";
import { NLabel } from "./../../UI/NLabel";
import { Campaign } from "./../../Data/Campaign";

class QuestDetailsPanel extends TBX.Panel
{
    private _Title:NLabel;
    private _Description:NLabel;
    private _Length:NLabel;
    private _Environment:NLabel;
    private _Quest:Quest;
    public constructor(Old?:QuestDetailsPanel, QuestID?:string)
    {
        super(Old);
        if(Old)
        {
            this._Quest = Old._Quest.Copy();
        }
        else
        {
            this.Init();
            if(QuestID) this.InitData(QuestID);
        }
    }
    public Copy() : QuestDetailsPanel
    {
        return new QuestDetailsPanel(this);
    }
    private Init() : void
    {
        this.Size = new TBX.Vertex(200,180);
        this.BackColor = TBX.Color.Empty;
        this.Border.Radius = 10;
        this.Border.Width = 3;
        this._Title = new NLabel(null, "Title");
        this._Title.Size = new TBX.Vertex(200,40);
        this._Title.Position = new TBX.Vertex(0, -55);
        this._Title.TextSize = 20;
        this.Attach(this._Title);
        this._Description = new NLabel(null, "Description");
        this._Description.Size = new TBX.Vertex(170,100);
        this._Description.Position = new TBX.Vertex(0, 10);
        this._Description.TextSize = 12;
        this._Description.TextAlign = TBX.TextAlign.Left;
        this.Attach(this._Description);
        this._Length = new NLabel(null, "");
        this._Length.Size = new TBX.Vertex(160,40);
        this._Length.Position = new TBX.Vertex(0, 40);
        this._Length.TextSize = 13;
        this._Length.TextAlign = TBX.TextAlign.Left;
        this.Attach(this._Length);
        this._Environment = new NLabel(null, "");
        this._Environment.Size = new TBX.Vertex(160,40);
        this._Environment.Position = new TBX.Vertex(0, 65);
        this._Environment.TextSize = 13;
        this._Environment.TextAlign = TBX.TextAlign.Left;
        this.Attach(this._Environment);
        this.Active = false;
    }
    public InitData(QuestID:string) : void
    {
        this._Quest = Campaign.Current.FindQuest(QuestID);
        if(!this._Quest)
        {
            TBX.Log.Error("Quest Details Failed.", QuestID, "Narbu_UI");
            return;
        }
        this._Title.Text = this._Quest.Name;
        this._Description.Text = this._Quest.Description;
        let LengthString = (this._Quest.Length==1)?"Short":((this._Quest.Length==2)?"Medium":"Long");
        this._Length.Text = "Length: " + LengthString;
        this._Environment.Text = "Environment: " + this._Quest.Setting;
    }
    public SetColor(Paint:TBX.Color) : void
    {
        this.Border.Color = Paint;
        this._Title.ForeColor = Paint;
        this._Description.ForeColor = Paint;
        this._Length.ForeColor = Paint;
        this._Environment.ForeColor = Paint;
    }
}