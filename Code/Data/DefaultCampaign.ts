export { DefaultCampaign }

let DefaultCampaign =
{
    Roster:
    {
        Size: 10,
        Characters:
        [
            {
                Name: "Gustav The Anchor",
                Class: "Warrior",
                Level: 1,
                Experience: 0
            },
            {
                Name: "Sir Esen De Chat",
                Class: "Warrior",
                Level: 1,
                Experience: 0
            },
            {
                Name: "Hawkeye Nartin",
                Class: "Archer",
                Level: 1,
                Experience: 0
            },
            {
                Name: "Bob Of Booze",
                Class: "Archer",
                Level: 1,
                Experience: 0
            }
        ]
    },
    Stops:
    [
        {
            Name: "Start",
            Depth: 0,
            ForeColor: "#000000",
            BackColor: "#0BB5FF"
        },
        {
            Name: "Upper Summit Ruins",
            Depth: 800,
            ForeColor: "#111111",
            BackColor: "#AAAAAA",
            LeftMarkers:
            [
                {
                    
                    QuestID: "Treasure1",
                    Type: "Treasure"
                }
            ],
            RightMarkers:
            [
                {
                    
                    QuestID: "Rope1",
                    Type: "Rope"
                }
            ]
        },
        {
            Name: "Lower Summit Ruins",
            Depth: 1000,
            ForeColor: "#222222",
            BackColor: "#889988",
            LeftMarkers:
            [
                {
                    
                    QuestID: "Rope2",
                    Type: "Rope"
                },
                {
                    
                    QuestID: "Treasure2",
                    Type: "Treasure"
                }
            ],
            RightMarkers:
            [
                {
                    
                    QuestID: "Forge1",
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
    ],
    Quests:
    [
        {
            ID: "Treasure1",
            Name: "Explore Ruins",
            Description: "Look if there is any treasure that is not already looted by previous adventures.",
            Type: "Treasure",
            Length: 1,
            Width: 3,
            Setting: "Ruins"
        },
        {
            ID: "Treasure2",
            Name: "Loot The Vault",
            Description: "Find the vault hidden deep within the ruins.",
            Type: "Treasure",
            Length: 2,
            Width: 5,
            Setting: "Ruins"
        },
        {
            ID: "Rope1",
            Name: "Find Some Rope",
            Description: "Look in ruins warehouses if there is any giant rope to allow you to go lower in well.",
            Type: "Rope",
            Length: 1,
            Width: 5,
            Setting: "Ruins"
        },
        {
            ID: "Rope2",
            Name: "Find More Rope",
            Description: "There should be abundance of rope somewhere within walls of Summit Ruins arena",
            Type: "Rope",
            Length: 1,
            Width: 5,
            Setting: "Ruins"
        },
        {
            ID: "Forge1",
            Name: "Imp Pike Forge",
            Description: "Use old dwarven forge to craft magnificent weapon.",
            Type: "Forge",
            Length: 1,
            Width: 5,
            Setting: "Ruins"
        }
    ]
}