import React from 'react';
import ReactDOM from 'react-dom';
import Roster from './components/Roster';
import Field from './components/Field';
import style from './styles/main'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import { Provider, connect } from 'react-redux';
import store from './store'
import { ApplicationState } from './store/reducer'

const connected = {
	Field: connect((state: ApplicationState) => ({ positions: state.positions, players: state.players }))(Field),
	Roster: connect((state: ApplicationState) => ({ players: state.players }))(Roster)
}

@DragDropContext(HTML5Backend)
class App extends React.Component<{}, {}> {
	
	render() {
		return (
			<Provider store={store}>
				<div className={style.main}>
					<connected.Field />
					<connected.Roster />
				</div>
			</Provider>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('app'));