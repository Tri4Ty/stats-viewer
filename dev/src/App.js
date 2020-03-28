import React, { PureComponent } from 'react';

import GAME_STATS_SCHEMA from './schema';
import GAME_STATS from './stats';

import StatsList from '../../src/components/StatsList';
import formatDataListToSchema from '../../src/utilities';
 
class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      playerStats: [],
      goalieStats: []
    };
  }

  componentDidMount() {
    this.setState({
      playerStats: formatDataListToSchema(GAME_STATS_SCHEMA.players, GAME_STATS.players),
      goalieStats: formatDataListToSchema(GAME_STATS_SCHEMA.goalies, GAME_STATS.goalies)
    });
  }
  render() {
    const { playerStats, goalieStats } = this.state;

    return (
      <div>
        <h1>Game Stats</h1>
        <h2>Player Stats</h2>
        <StatsList schema={GAME_STATS_SCHEMA.players} stats={playerStats} />

        <h2>Goalie Stats</h2>
        <StatsList schema={GAME_STATS_SCHEMA.goalies} stats={goalieStats} />
      </div>
    );
  }
}
 
export default App;