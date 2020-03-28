const GAME_STATS_SCHEMA = {
  game: [
    {
      id: "id",
      attribute: "id",
      display: "Game Number"
    },
    {
      id: "date",
      attribute: "date",
      display: "Date"
    },
    {
      id: "type",
      attribute: "type",
      display: "Game Type"
    },
    {
      id: "opponent",
      attribute: "opponent",
      display: "Opponent"
    },
    {
      id: "location",
      attribute: "location",
      display: "Home/Visitor"
    }
  ],
  team: [
    {
      id: "scf",
      attribute: "scf",
      display: "Scoring Chances For"
    },
    {
      id: "sca",
      attribute: "sca",
      display: "Scoring Chances Against"
    },
    {
      id: "pa",
      attribute: "pa",
      display: "Pass Attempts"
    },
    {
      id: "cp",
      attribute: "cp",
      display: "Completed Passes"
    },
    {
      id: 'passPercentage',
      attribute: {
        calculate: "(${cp}/${pa}*100).toFixed(2)"
      },
      display: "Passinc Accuracy (%)"
    },
      {
      id: "ozt",
      attribute: "ozt",
      display: "Offensive Zone Time"
    },
    {
      id: "dzt",
      attribute: "dzt",
      display: "Defensive Zone Time"
    },
    {
      id: "ga",
      attribute: "ga",
      display: "Give Aways"
    },
    {
      id: "ta",
      attribute: "ta",
      display: "Take Aways"
    },
    {
      id: "fw",
      attribute: "fw",
      display: "Faceoff Wins"
    },
    {
      id: "fl",
      attribute: "fl",
      display: "Faceoff Loss"
    },
    {
      id: 'fp',
      attribute: {
        calculate: "(${fw}/(${fw}+${fl})*100).toFixed(2)"
      },
      display: "Passinc Accuracy (%)"
    }
  ],
  players: [
    {
      id: "number",
      attribute: "number",
      display: "#"
    },
    {
      id: "name",
      attribute: {
        concat: [
          "${lastName}",
          ", ",
          "${firstName}"
        ]
      },
      display: "Name"    
    },
    {
      id: "goals",
      attribute: "goals",
      display: "G"
    },
    {
      id: "assists",
      attribute: "assists",
      display: "A"
    },
    {
      id: "points",
      attribute: {
        calculate: "${goals}+${assists}"
      },
      display: "P"
    },
    {
      id: "pim",
      attribute: "pim",
      display: "PIM"
    },
    {
      id: 'shots',
      attribute: 'shots',
      display: "Shots"
    },
    {
      id: 'sa',
      attribute: 'sa',
      display: "Shot Attempts"
    },
    {
      id: 'scoringAccuracy',
      attribute: {
        calculate: "(${goals}/${shots}*100).toFixed(2)"
      },
      display: "Scoring %"
    },
    {
      id: 'shootingAccuracy',
      attribute: {
        calculate: "(${shots}/${sa}*100).toFixed(2)"
      },
      display: "Shooting %"
    },
    {
      id: 'ppg',
      attribute: 'ppg',
      display: "PPG"
    },
    {
      id: 'shg',
      attribute: 'shg',
      display: "SHG"
    },
    {
      id: 'gwg',
      attribute: 'gwg',
      display: "GWG"
    }
  ],
  goalies:[
    {
      id: "number",
      attribute: "number",
      display: "#"
    },
    {
      id: "name",
      attribute: {
        concat: [
          "${lastName}",
          ", ",
          "${firstName}"
        ]
      },
      display: "Name"    
    },
    {
      id: "min",
      attribute: "min",
      display: "MIN"
    },
    {
      id: "sog",
      attribute: "sog",
      display: "SOG"
    },
    {
      id: "ga",
      attribute: "ga",
      display: "GA"
    },
    {
      id: "gaa",
      attribute: {
        calculate: "(${ga}*60/${min}).toFixed(2)"
      },
      display: "GAA"
    },
    {
      id: "sv",
      attribute: "sv",
      display: "Saves"
    },
    {
      id: "svp",
      attribute: {
        calculate: "((1-${ga}/${sog})*100).toFixed(2)"
      },
      display: "Save %"
    },
    {
      id: 'so',
      attribute: 'so',
      display: "Shutout"
    }
  ]
};
export default GAME_STATS_SCHEMA;