import { actionTypes } from './actions'

export type Player = {
	id: number,
	name: string,
	inRoster: boolean,
}

export type Position = {
	id: number,
	title: string,
	player: { id?: number, name?: string }
}

export type ApplicationState = {
	players: Player[],
	positions: Position[],
};

const initialState: ApplicationState = {
	players: [
		{ id: 1, name: 'Messi', inRoster: true },
		{ id: 2, name: 'Rooney', inRoster: true },
		{ id: 3, name: 'Becks', inRoster: true },
	],
	positions: [
		{ id: 0, title: 'lwf', player: {} },
		{ id: 1, title: 'cf', player: {} },
		{ id: 2, title: 'cf', player: {} },
		{ id: 3, title: 'rwf', player: {} },
		{ id: 4, title: 'lm', player: {} },
		{ id: 5, title: 'cam', player: {} },
		{ id: 6, title: 'cam', player: {} },
		{ id: 7, title: 'rm', player: {} },
		{ id: 8, title: 'lwb', player: {} },
		{ id: 9, title: 'cdm', player: {} },
		{ id: 10, title: 'cdm', player: {} },
		{ id: 11, title: 'rwb', player: {} },
		{ id: 12, title: 'lb', player: {} },
		{ id: 13, title: 'cb', player: {} },
		{ id: 14, title: 'cb', player: {} },
		{ id: 15, title: 'rb', player: {} },
		{ id: 16, title: 'gk', player: {} }
	]
}

export default function (state = initialState, { type, payload }) {
	switch (type) {
		case actionTypes.roster.REMOVE_PLAYER:
		case actionTypes.roster.RETURN_PLAYER:
		case actionTypes.field.PUT_PLAYER:
		case actionTypes.field.DROP_PLAYER:
		case actionTypes.field.SWAP_PLAYERS:
			return { ...state, ...payload };

		default:
			return state;
	}
}