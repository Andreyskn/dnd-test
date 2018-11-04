import { Position, Player } from './reducer'

export const actionTypes = {
	field: {
		PUT_PLAYER: '[FIELD] PUT_PLAYER',
		DROP_PLAYER: '[FIELD] DROP_PLAYER',
		SWAP_PLAYERS: '[FIELD] SWAP_PLAYERS',
	},
	roster: {
		REMOVE_PLAYER: '[ROSTER] REMOVE_PLAYER',
		RETURN_PLAYER: '[ROSTER] RETURN_PLAYER',
	}
}

export const actions = {
	field: {
		putPlayer: (positions: Position[]) => ({ type: actionTypes.field.PUT_PLAYER, payload: { positions } }),
		dropPlayer: (positions: Position[]) => ({ type: actionTypes.field.DROP_PLAYER, payload: { positions } }),
		swapPlayers: (positions: Position[]) => ({ type: actionTypes.field.SWAP_PLAYERS, payload: { positions } }),
	},
	roster: {
		removePlayer: (players: Player[]) => ({ type: actionTypes.roster.REMOVE_PLAYER, payload: { players } }),
		returnPlayer: (players: Player[]) => ({ type: actionTypes.roster.RETURN_PLAYER, payload: { players } }),
	}
}
