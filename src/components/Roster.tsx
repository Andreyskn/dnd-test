import React from 'react';
import { Dispatch } from 'redux'
import Player from './Player';
import style from '../styles/components/Roster'
import { actions } from '../store/actions'
import { updateArray } from '../utils'
import { Player as PlayerType } from '../store/reducer'

interface RosterProps {
	dispatch: Dispatch,
	players: PlayerType[],
}

export default class Roster extends React.Component<RosterProps, {}> {

	removePlayer = (playerId) => {
		const { dispatch, players } = this.props;
		const updatedPlayers = updateArray.singleChange(players, playerId, { inRoster: false });
		
		dispatch(actions.roster.removePlayer(updatedPlayers));
	}

	render() {
		const players = this.props.players.filter(player => player.inRoster);

		return (
			<div className={style.base}>
				{players.map(player => <Player name={player.name} key={player.id} id={player.id} removePlayer={this.removePlayer} />)}
			</div>
		)
	}
}
