import React from 'react'
import style from '../styles/components/Player'
import { DragSource, DragSourceConnector, ConnectDragSource } from 'react-dnd'

interface PlayerProps {
	id: number,
	name: string,
	slotId?: number,
	canDropOut?: boolean,
	removePlayer: (playerId: number, positionId?: number, outOfField?: boolean) => void,
}

interface DragDropProps {
	connectDragSource?: ConnectDragSource
}

export interface PlayerData {
	id: number,
	name: string,
	position: number | undefined,
}

const dragSourceSpec = {
	beginDrag(props: PlayerProps): PlayerData {
		return {
			id: props.id,
			name: props.name,
			position: props.slotId
		};
	},

	endDrag(props: PlayerProps, monitor) {
		const { id: playerId, slotId, removePlayer, canDropOut } = props;
		const isOnTarget = monitor.didDrop();
		const legalPosition = isOnTarget && monitor.getDropResult().positionId !== slotId;

		if (legalPosition) removePlayer(playerId, slotId);
		else if (!isOnTarget && canDropOut) removePlayer(playerId, slotId, true);
	}
};

function collect(connect: DragSourceConnector, monitor) {
	return {
		connectDragSource: connect.dragSource(),
	}
}

@DragSource('player', dragSourceSpec, collect)
export default class Player extends React.Component<PlayerProps & DragDropProps, {}> {

	render() {
		return this.props.connectDragSource(
			<div className={style.player} draggable>
				<span>{this.props.name}</span>
			</div>
		)
	}
}
