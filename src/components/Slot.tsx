import React from 'react'
import style from '../styles/components/Slot'
import { DropTarget, DropTargetConnector, ConnectDropTarget } from 'react-dnd'
import Player from './Player'
import { Object } from 'core-js';

interface SlotProps {
	id: number,
	title: string,
	player: { id?: number, name?: string },
	putPlayer: (positionId: number, playerData: any) => void,
	removePlayer: (playerId: number, positionId: number, outOfField: boolean) => void,
}

interface DragDropProps {
	connectDropTarget?: ConnectDropTarget
}

const spec = {
	drop(props: SlotProps, monitor) {
		const player = monitor.getItem();
		const { putPlayer, id: positionId } = props;

		putPlayer(positionId, player);
		return { positionId };
	}
};

function collect(connect: DropTargetConnector, monitor) {
	return {
		connectDropTarget: connect.dropTarget(),
	};
}

@DropTarget('player', spec, collect)
export default class Slot extends React.Component<SlotProps & DragDropProps, {}> {

	render() {
		const { id, player, removePlayer, connectDropTarget } = this.props;
		const hasData = Object.keys(player).length > 0;

		return connectDropTarget(
			<div className={style.slot}>
				<div>{this.props.title}</div>
				{hasData && <Player name={player.name} key={player.id} id={player.id} removePlayer={removePlayer} canDropOut slotId={id} />}
			</div>
		)
	}
}
