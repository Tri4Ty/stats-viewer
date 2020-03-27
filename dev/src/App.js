import React, { PureComponent } from 'react';

import StatsList from '../../src/components/StatsList';

const schema = [
  {
    id: "number",
    attribute: "number",
    display: "Number"
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
    display: "Goals"
  },
  {
    id: "assists",
    attribute: "assists",
    display: "Assists"
  },
  {
    id: "points",
    attribute: {
      calculate: "${goals}+${assists}"
    },
    display: "Points"
  },
  {
    id: "pim",
    attribute: "pim",
    display: "Penalty Minutes"
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
    display: "Scoring Accuracy (%)"
  },
  {
    id: 'shootingAccuracy',
    attribute: {
      calculate: "(${shots}/${sa}*100).toFixed(2)"
    },
    display: "Shooting Accuracy (%)"
  }
];

const stats = [
  {
    number: 10,
    firstName: "Asher",
    lastName: "Goldfarb",
    goals: 0,
    assists: 1,
    pim: 2,
    sa: 7,
    shots: 2
  },
  {
    number: 11,
    firstName: "Antoine",
    lastName: "Mullen",
    goals: 2,
    assists: 1,
    sa: 6,
    shots: 5
  },
  {
    number: 12,
    firstName: "Ty",
    lastName: "Thomas",
    goals: 1,
    assists: 2,
    pim: 4,
    sa: 5,
    shots: 3
  }
];
 
class App extends PureComponent {
  render() {
    return (
      <StatsList schema={schema} stats={stats} />
    );
  }
}
 
export default App;