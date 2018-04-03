export { DefaultCampaign }

let DefaultCampaign =
{
    Stops:
    [
        {
            Name: "Start",
            Depth: 0,
            ForeColor: "#000000",
            BackColor: "#0BB5FF"
        },
        {
            Name: "First Stop",
            Depth: 800,
            ForeColor: "#111111",
            BackColor: "#AAAAAA",
            LeftMarkers:
            [
                {
                    QuestID: "Quest1",
                    Type: "Treasure"
                },
                {
                    QuestID: "Quest2",
                    Type: "Rope"
                }
            ],
            RightMarkers:
            [
                {
                    QuestID: "Quest3",
                    Type: "Rope"
                },
            ]
        },
        {
            Name: "Second Stop",
            Depth: 1000,
            ForeColor: "#222222",
            BackColor: "#88BB88",
            LeftMarkers:
            [
                {
                    QuestID: "Quest1",
                    Type: "Treasure"
                },
            ],
            RightMarkers:
            [
                {
                    QuestID: "Quest3",
                    Type: "Treasure"
                },
                {
                    QuestID: "Quest2",
                    Type: "Forge"
                }
            ]
        },
        {
            Name: "Third Stop",
            Depth: 1400,
            ForeColor: "#111111",
            BackColor: "#11FF11",
        },
        {
            Name: "Fourth Stop",
            Depth: 1600,
            ForeColor: "#111111",
            BackColor: "#AAAA66",
        },
        {
            Name: "Fifth Stop",
            Depth: 1800,
            ForeColor: "#111111",
            BackColor: "#C22121",
        }
    ]
}