import React from 'react'
import { Dispatch } from 'redux'
import Slot from './Slot'
import style from '../styles/components/Field'
import { actions } from '../store/actions'
import { updateArray } from '../utils'
import { Position, Player } from '../store/reducer'

interface FieldProps {
	dispatch: Dispatch,
	players: Player[],
	positions: Position[],
}

export default class Field extends React.Component<FieldProps, {}> {

	returnToRoster = (playerId) => {
		const { dispatch, players } = this.props;
		const updatedPlayers = updateArray.singleChange(players, playerId, { inRoster: true });
		dispatch(actions.roster.returnPlayer(updatedPlayers));
	}

	putPlayer = (positionId, playerData) => {
		const { dispatch, positions } = this.props;
		let isPutBack = false, isSwapping = false;
		const isTaken = positions[positionId].player.id;

		if (isTaken) {
			isPutBack = positions[positionId].player.id === playerData.id;
			isSwapping = !isPutBack && !!playerData.position;
		}
		
		if (isSwapping) {
			const swapTarget = positions[positionId].player
			const swapSource = { id: playerData.id, name: playerData.name };
			const updatedPositions = updateArray.multiChange(positions, [positionId, playerData.position], [{ player: swapSource }, { player: swapTarget }]);
			return dispatch(actions.field.swapPlayers(updatedPositions));
		}
		if (isTaken && !isPutBack) this.returnToRoster(positions[positionId].player.id);
		if (!isPutBack) {
			const { id, name } = playerData;
			const updatedPositions = updateArray.singleChange(positions, positionId, { player: { id, name } });
			dispatch(actions.field.putPlayer(updatedPositions));
		}
	}

	dropPlayer = (playerId, positionId, outOfField) => {
		const { dispatch, positions } = this.props;
		const isSwapping = positions[positionId].player.id !== playerId;

		if (outOfField) this.returnToRoster(playerId);
		if (!isSwapping) {
			const updatedPositions = updateArray.singleChange(positions, positionId, { player: {} });

			dispatch(actions.field.dropPlayer(updatedPositions));
		}
	}

	render() {
		const { positions } = this.props;

		return (
			<div className={style.base}>
				{positions.map(pos => <Slot key={pos.id} id={pos.id} title={pos.title} player={pos.player} putPlayer={this.putPlayer} removePlayer={this.dropPlayer} />)}
			</div>
		)
	}
}
