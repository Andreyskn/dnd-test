import { createStore } from 'redux';
import reducer from './reducer';

export default createStore(reducer, undefined, (window as any).devToolsExtension && (window as any).devToolsExtension());